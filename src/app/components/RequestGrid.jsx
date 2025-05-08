"use client";

import React from "react";
import styles from "../../styles/art_request.module.css";

function RequestGrid({ requests, onRequestClick }) {
  return (
    <div className={styles.requestGrid}>
      {requests.map((request) => (
        <div
          key={request.id}
          className={styles.gridItem}
          onClick={() => onRequestClick(request)}
        >
          {request.sampleImageUrl && (
            <div className={styles.requestImageContainer}>
              <img
                src={request.sampleImageUrl}
                alt={request.title}
                className={styles.requestImage}
              />
            </div>
          )}
          <div className={styles.requestInfo}>
            <h3 className={styles.requestTitle}>{request.title}</h3>
            {request.price && (
              <p className={styles.budgetInfo}>Min. Bid: ${request.price}</p>
            )}
            <p className={styles.requesterUsername}>
              Requester: {request.artistName || "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RequestGrid;