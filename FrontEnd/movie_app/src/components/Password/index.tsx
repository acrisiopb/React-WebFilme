import { useState } from 'react';
import './index.scss';
import api from '@/services/api';
import { toast } from 'react-toastify';

export default function UpdatePassword({ onClose }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        // Validação de senhas
        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            // Enviar currentPassword, newPassword e confirmPassword
            const dadosParaEnviar = { currentPassword, newPassword, confirmPassword };

            // Alteração de senha na API
            await api.patch('/api/register', dadosParaEnviar);  // Rota para alterar senha

            // Exibir mensagem de sucesso
            toast.success("Senha alterada com sucesso!");
            setSuccess("Senha alterada com sucesso!");
            onClose();  // Fechar o modal após sucesso
        } catch (err) {
            console.error('Erro:', err.response ? err.response.data : err.message);
            toast.error("Erro ao alterar a senha. Tente novamente.");
            setError('Erro ao alterar a senha. Tente novamente.');
        }
    };

    return (
        <div className="update-password-container">
            <div className="modal-header">
                <h2>Alterar Senha</h2>
                <button onClick={onClose} className="close-modal">
                    ✕
                </button>
            </div>
            <div className="card-left">
                <form onSubmit={handleSubmit}>
                    <label className="label-input">Senha Atual</label>
                    <input
                        type="password"
                        placeholder="Senha atual"
                        required
                        className="input-field"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <label className="label-input">Nova Senha</label>
                    <input
                        type="password"
                        placeholder="Crie uma nova senha"
                        required
                        className="input-field"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <label className="label-input">Confirmar Senha</label>
                    <input
                        type="password"
                        placeholder="Repita a senha"
                        required
                        className="input-field"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <button type="submit" className="btn">
                        Alterar
                    </button>
                </form>
            </div>
        </div>
    );
}
