// components/SeekArtistPopup.jsx

import React from 'react';
import styles from '../../styles/seekartistpopup.module.css'; // Import CSS module

function SeekArtistPopup({ onClose }) {
    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <button onClick={onClose} className={styles.closeButton}>
                    <i className="fas fa-times"></i>
                </button>
                <h2>หานักวาด</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="type">Type:</label>
                    <select id="type">
                        <option value="artign">Artign</option>
                        <option value="commission">Commission</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="style">Style:</label>
                    <input type="text" id="style" placeholder="e.g., Anime, Realistic, Abstract" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" placeholder="e.g., Character, Landscape, Portrait" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="budget">Budget (THB):</label>
                    <input type="number" id="budget" placeholder="Enter your budget" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="deadline">Deadline:</label>
                    <input type="text" id="deadline" placeholder="Optional" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Additional Description:</label>
                    <textarea id="description" placeholder="Optional details about your request"></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label>NSFW:</label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input type="radio" name="nsfw" value="yes" /> Yes
                        </label>
                        <label>
                            <input type="radio" name="nsfw" value="no" defaultChecked /> No
                        </label>
                        <label>
                            <input type="radio" name="nsfw" value="optional" /> Optional
                        </label>
                    </div>
                </div>
                <div className={styles.agreementSection}>
                    <p>Agreement</p>
                    <label>
                        <input type="checkbox" /> I agree to the terms and conditions.
                    </label>
                </div>
                <button type="submit" className={styles.submitButton}>Submit Request</button>
            </div>
        </div>
    );
}

export default SeekArtistPopup;