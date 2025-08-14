import React from 'react';
import '@/styles/components/timeline-skeleton.css';

interface TimelineSkeletonProps {
  count?: number;
}

export default function TimelineSkeleton({ count = 3 }: TimelineSkeletonProps) {
  return (
    <div className="mindscape-loading-placeholder">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="timeline-event skeleton" />
      ))}
    </div>
  );
}
