import '@/styles/ConfirmModal.css'; // 你可以自訂樣式

interface Props {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message?: string;
}

export default function ConfirmModal({ visible, onConfirm, onCancel, message }: Props) {
    if (!visible) return null;

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <p>{message || 'Are you sure you want to submit this item?'}</p>
                <div className="modalActions">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm} className="confirmBtn">Confirm</button>
                </div>
            </div>
        </div>
    );
}
