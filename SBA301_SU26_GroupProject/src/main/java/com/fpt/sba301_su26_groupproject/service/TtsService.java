package com.fpt.sba301_su26_groupproject.service;

/**
 * Service interface for Text-to-Speech integration.
 * Converts chapter text content into MP3 audio bytes.
 */
public interface TtsService {

    /**
     * Converts text to speech audio.
     *
     * @param text the plain text to synthesize (HTML will be stripped internally)
     * @return MP3 audio as a byte array
     */
    byte[] synthesizeSpeech(String text);
}
