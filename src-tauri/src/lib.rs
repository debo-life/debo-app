use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Memory {
    id: String,
    title: String,
    content: String,
    #[serde(rename = "type")]
    memory_type: String,
    completed: bool,
    created_at: String,
    updated_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Journal {
    id: String,
    title: String,
    content: Option<String>,
    plain_text: String,
    excerpt: String,
    tags: String,
    word_count: i64,
    favorite: bool,
    created_at: String,
    updated_at: String,
}

#[tauri::command]
async fn get_memories(
    db: tauri::State<'_, tauri_plugin_sql::DbInstances>,
) -> Result<Vec<Memory>, String> {
    let db = db.get("sqlite:debo.db").await.map_err(|e| e.to_string())?;
    let memories = db
        .select("SELECT * FROM memories ORDER BY created_at DESC")
        .await
        .map_err(|e| e.to_string())?;
    Ok(memories)
}

#[tauri::command]
async fn create_memory(
    db: tauri::State<'_, tauri_plugin_sql::DbInstances>,
    title: String,
    content: String,
    memory_type: String,
) -> Result<Memory, String> {
    let id = generate_id();
    let now = now_iso();
    db.execute(
        "INSERT INTO memories (id, title, content, type, completed, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, 0, ?5, ?6)",
        [&id, &title, &content, &memory_type, &now, &now],
    )
    .await
    .map_err(|e| e.to_string())?;
    Ok(Memory {
        id,
        title,
        content,
        memory_type,
        completed: false,
        created_at: now.clone(),
        updated_at: now,
    })
}

#[tauri::command]
async fn update_memory(
    db: tauri::State<'_, tauri_plugin_sql::DbInstances>,
    id: String,
    title: Option<String>,
    content: Option<String>,
    memory_type: Option<String>,
    completed: Option<bool>,
) -> Result<(), String> {
    let now = now_iso();
    let completed_val: Option<String> = completed.map(|c| if c { "1".into() } else { "0".into() });
    db.execute(
        "UPDATE memories SET title = COALESCE(?2, title), content = COALESCE(?3, content), type = COALESCE(?4, type), completed = COALESCE(?5, completed), updated_at = ?6 WHERE id = ?1",
        [
            &id as &dyn tauri_plugin_sql::ToSql,
            &title as &dyn tauri_plugin_sql::ToSql,
            &content as &dyn tauri_plugin_sql::ToSql,
            &memory_type as &dyn tauri_plugin_sql::ToSql,
            &completed_val as &dyn tauri_plugin_sql::ToSql,
            &now as &dyn tauri_plugin_sql::ToSql,
        ],
    )
    .await
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
async fn delete_memory(
    db: tauri::State<'_, tauri_plugin_sql::DbInstances>,
    id: String,
) -> Result<(), String> {
    db.execute("DELETE FROM memories WHERE id = ?1", [&id])
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
async fn get_journals(
    db: tauri::State<'_, tauri_plugin_sql::DbInstances>,
) -> Result<Vec<Journal>, String> {
    let db = db.get("sqlite:debo.db").await.map_err(|e| e.to_string())?;
    let journals = db
        .select("SELECT * FROM journals ORDER BY updated_at DESC")
        .await
        .map_err(|e| e.to_string())?;
    Ok(journals)
}

#[tauri::command]
async fn create_journal(
    db: tauri::State<'_, tauri_plugin_sql::DbInstances>,
    title: String,
    content: Option<String>,
    plain_text: String,
    excerpt: String,
    tags: String,
    word_count: i64,
) -> Result<Journal, String> {
    let id = generate_id();
    let now = now_iso();
    let content_str = content.unwrap_or_default();
    let wc = word_count.to_string();
    db.execute(
        "INSERT INTO journals (id, title, content, plain_text, excerpt, tags, word_count, favorite, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 0, ?8, ?9)",
        [&id, &title, &content_str, &plain_text, &excerpt, &tags, &wc, &now, &now],
    )
    .await
    .map_err(|e| e.to_string())?;
    Ok(Journal {
        id,
        title,
        content: Some(content_str),
        plain_text,
        excerpt,
        tags,
        word_count,
        favorite: false,
        created_at: now.clone(),
        updated_at: now,
    })
}

#[tauri::command]
async fn update_journal(
    db: tauri::State<'_, tauri_plugin_sql::DbInstances>,
    id: String,
    title: Option<String>,
    content: Option<String>,
    plain_text: Option<String>,
    excerpt: Option<String>,
    tags: Option<String>,
    word_count: Option<i64>,
    favorite: Option<bool>,
) -> Result<(), String> {
    let now = now_iso();
    let wc: Option<String> = word_count.map(|w| w.to_string());
    let fav: Option<String> = favorite.map(|f| if f { "1".into() } else { "0".into() });
    db.execute(
        "UPDATE journals SET title = COALESCE(?2, title), content = COALESCE(?3, content), plain_text = COALESCE(?4, plain_text), excerpt = COALESCE(?5, excerpt), tags = COALESCE(?6, tags), word_count = COALESCE(?7, word_count), favorite = COALESCE(?8, favorite), updated_at = ?9 WHERE id = ?1",
        [
            &id as &dyn tauri_plugin_sql::ToSql,
            &title as &dyn tauri_plugin_sql::ToSql,
            &content as &dyn tauri_plugin_sql::ToSql,
            &plain_text as &dyn tauri_plugin_sql::ToSql,
            &excerpt as &dyn tauri_plugin_sql::ToSql,
            &tags as &dyn tauri_plugin_sql::ToSql,
            &wc as &dyn tauri_plugin_sql::ToSql,
            &fav as &dyn tauri_plugin_sql::ToSql,
            &now as &dyn tauri_plugin_sql::ToSql,
        ],
    )
    .await
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
async fn delete_journal(
    db: tauri::State<'_, tauri_plugin_sql::DbInstances>,
    id: String,
) -> Result<(), String> {
    db.execute("DELETE FROM journals WHERE id = ?1", [&id])
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

fn generate_id() -> String {
    let ts = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_millis();
    let rand = (ts & 0xffffff) as u32;
    format!("{:x}{:06x}", ts, rand)
}

fn now_iso() -> String {
    let dur = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap();
    let secs = dur.as_secs();
    // Simple ISO-like format: unix timestamp string
    secs.to_string()
}

const MIGRATION: &str = "
CREATE TABLE IF NOT EXISTS memories (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    type TEXT NOT NULL DEFAULT 'thought',
    completed INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS journals (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL DEFAULT '',
    content TEXT DEFAULT '',
    plain_text TEXT NOT NULL DEFAULT '',
    excerpt TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '[]',
    word_count INTEGER NOT NULL DEFAULT 0,
    favorite INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
";

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_sql::Builder::new("sqlite:debo.db")
                .add_migration(MIGRATION)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            get_memories,
            create_memory,
            update_memory,
            delete_memory,
            get_journals,
            create_journal,
            update_journal,
            delete_journal,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
