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

-- Create the inline_seo_metadata_edits table for SEO metadata and structured data edits
CREATE TABLE IF NOT EXISTS inline_seo_metadata_edits (
    id BIGSERIAL PRIMARY KEY,
    page_key VARCHAR(255) NOT NULL,
    page_url TEXT NOT NULL,
    programmatic_instance VARCHAR(255),
    edit_type VARCHAR(20) NOT NULL CHECK (edit_type IN ('metadata', 'structured_data')),
    field_path TEXT NOT NULL,
    original_value JSONB,
    new_value JSONB,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'processing', 'applied', 'failed')),
    component_id VARCHAR(255), -- For structured data edits, identifies which component
    schema_type VARCHAR(50), -- For structured data edits, e.g., 'organization', 'faq', 'website'
    metadata JSONB, -- Additional metadata about the edit (user agent, timestamp, etc.)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_inline_seo_metadata_edits_page_key 
    ON inline_seo_metadata_edits(page_key);

CREATE INDEX IF NOT EXISTS idx_inline_seo_metadata_edits_page_url 
    ON inline_seo_metadata_edits(page_url);

CREATE INDEX IF NOT EXISTS idx_inline_seo_metadata_edits_programmatic_instance 
    ON inline_seo_metadata_edits(programmatic_instance) 
    WHERE programmatic_instance IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_inline_seo_metadata_edits_edit_type 
    ON inline_seo_metadata_edits(edit_type);

CREATE INDEX IF NOT EXISTS idx_inline_seo_metadata_edits_component_id 
    ON inline_seo_metadata_edits(component_id) 
    WHERE component_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_inline_seo_metadata_edits_status 
    ON inline_seo_metadata_edits(status);

CREATE INDEX IF NOT EXISTS idx_inline_seo_metadata_edits_created_at 
    ON inline_seo_metadata_edits(created_at DESC);

-- Create a composite index for common queries (page + status)
CREATE INDEX IF NOT EXISTS idx_inline_seo_metadata_edits_page_status 
    ON inline_seo_metadata_edits(page_key, status);

-- Create a trigger to automatically update updated_at on row updates
CREATE TRIGGER update_inline_seo_metadata_edits_updated_at
    BEFORE UPDATE ON inline_seo_metadata_edits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add columns for hyperlink support to inline_text_edits table
ALTER TABLE inline_text_edits 
    ADD COLUMN IF NOT EXISTS contains_html_links BOOLEAN DEFAULT FALSE;

ALTER TABLE inline_text_edits 
    ADD COLUMN IF NOT EXISTS link_metadata JSONB;