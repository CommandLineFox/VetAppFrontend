import {Metric} from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
    if (onPerfEntry) {
        import('web-vitals').then((webVitals) => {
            const { onCLS, onFID, onFCP, onLCP, onTTFB, getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals as any;

            (onCLS || getCLS)?.(onPerfEntry);
            (onFID || getFID)?.(onPerfEntry);
            (onFCP || getFCP)?.(onPerfEntry);
            (onLCP || getLCP)?.(onPerfEntry);
            (onTTFB || getTTFB)?.(onPerfEntry);
        });
    }
};

export default reportWebVitals;