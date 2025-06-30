import './DemoDisabled.css';

export const DemoDisabled = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="demo-disabled-overlay" onClick={onClose}>
            <div
                className="demo-disabled-modal"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
            >
                <p>Demo User cannot be edited or deleted.</p>
                <button className="demo-disabled-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};
