-- SQL Schema for Text Editor Functionality
-- Simplified schema using herokit-id as primary identifier

-- Create the inline_text_edits table
CREATE TABLE IF NOT EXISTS inline_text_edits (
    id BIGSERIAL PRIMARY KEY,
    original_text TEXT NOT NULL,
    new_text TEXT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'processing', 'applied', 'failed')),
    page_url TEXT NOT NULL,
    herokit_id VARCHAR(255) NOT NULL,
    component_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_inline_text_edits_page_url 
    ON inline_text_edits(page_url);

CREATE INDEX IF NOT EXISTS idx_inline_text_edits_herokit_id 
    ON inline_text_edits(herokit_id);

CREATE INDEX IF NOT EXISTS idx_inline_text_edits_component_id 
    ON inline_text_edits(component_id) 
    WHERE component_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_inline_text_edits_status 
    ON inline_text_edits(status);

CREATE INDEX IF NOT EXISTS idx_inline_text_edits_created_at 
    ON inline_text_edits(created_at DESC);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at on row updates
CREATE TRIGGER update_inline_text_edits_updated_at
    BEFORE UPDATE ON inline_text_edits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();