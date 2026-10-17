use serde::Serialize;
use std::time::Duration;

const GATEWAY_BASE: &str = "http://127.0.0.1:8082";

#[derive(Serialize, Default)]
pub struct ProviderCounts {
    pub total: usize,
    pub configured: usize,
    pub missing_key: usize,
    pub disconnected: usize,
    pub other: usize,
}

#[derive(Serialize)]
pub struct GatewayStatus {
    pub online: bool,
    pub health: String,
    pub status: String,
    pub provider: String,
    pub model: String,
    pub host: String,
    pub port: u16,
    pub providers: ProviderCounts,
    pub models: usize,
    pub error: Option<String>,
}

fn http_client() -> Result<reqwest::Client, String> {
    reqwest::Client::builder()
        .timeout(Duration::from_millis(3000))
        .build()
        .map_err(|e| e.to_string())
}

async fn get_json(path: &str) -> Result<serde_json::Value, String> {
    let url = format!("{GATEWAY_BASE}{path}");
    let resp = http_client()?
        .get(&url)
        .send()
        .await
        .map_err(|e| e.to_string())?;
    if !resp.status().is_success() {
        return Err(format!("HTTP {}", resp.status().as_u16()));
    }
    resp.json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn gateway_status() -> GatewayStatus {
    let mut out = GatewayStatus {
        online: false,
        health: "unknown".to_string(),
        status: "offline".to_string(),
        provider: String::new(),
        model: String::new(),
        host: "127.0.0.1".to_string(),
        port: 8082,
        providers: ProviderCounts::default(),
        models: 0,
        error: None,
    };

    match get_json("/health").await {
        Ok(v) => {
            out.online = true;
            out.health = v.get("status").and_then(|x| x.as_str()).unwrap_or("healthy").to_string();
        }
        Err(e) => {
            out.error = Some(e);
            return out;
        }
    }

    if let Ok(v) = get_json("/admin/api/status").await {
        out.status = v.get("status").and_then(|x| x.as_str()).unwrap_or("running").to_string();
        out.provider = v.get("provider").and_then(|x| x.as_str()).unwrap_or_default().to_string();
        out.model = v.get("model").and_then(|x| x.as_str()).unwrap_or_default().to_string();
        if let Some(h) = v.get("host").and_then(|x| x.as_str()) {
            out.host = h.to_string();
        }
        if let Some(p) = v.get("port").and_then(|x| x.as_u64()) {
            out.port = p as u16;
        }
        if let Some(list) = v.get("provider_status").and_then(|x| x.as_array()) {
            let mut counts = ProviderCounts { total: list.len(), ..Default::default() };
            for item in list {
                match item.get("status").and_then(|x| x.as_str()).unwrap_or("") {
                    "configured" => counts.configured += 1,
                    "missing_key" => counts.missing_key += 1,
                    "disconnected" => counts.disconnected += 1,
                    _ => counts.other += 1,
                }
            }
            out.providers = counts;
        }
    }

    if let Ok(v) = get_json("/v1/models").await {
        if let Some(data) = v.get("data").and_then(|x| x.as_array()) {
            out.models = data.len();
        }
    }

    out
}

#[tauri::command]
fn start_gateway() -> Result<String, String> {
    use std::process::{Command, Stdio};
    for bin in ["teos-server.exe", "teos-server"] {
        if let Ok(_child) = Command::new(bin)
            .stdin(Stdio::null())
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()
        {
            return Ok(format!("launched {bin}"));
        }
    }
    Err("Could not find teos-server on PATH".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![gateway_status, start_gateway])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
