CREATE DATABASE mailpilot_ai;

\c mailpilot_ai;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    receiver_email VARCHAR(150) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    received_email TEXT,
    reply_purpose VARCHAR(50),
    tone VARCHAR(50),
    generated_reply TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drafts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    receiver_email VARCHAR(150),
    subject VARCHAR(255),
    received_email TEXT,
    reply_purpose VARCHAR(50),
    tone VARCHAR(50),
    draft_reply TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    default_tone VARCHAR(50) DEFAULT 'Professional',
    email_signature TEXT DEFAULT '',
    theme VARCHAR(20) DEFAULT 'Light'
);

CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);