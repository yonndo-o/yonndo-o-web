'use client';

import React from 'react';
import { FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
import Modal from '@/components/ui/Modal';
import '@/styles/components/profile/edit-modal.css';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingData: {
    alias: string;
    birthdate: string;
    gender: string;
    interests: string[];
    skills: string[];
    visibility: Record<string, boolean>;
  };
  onChange: (field: string, value: string | string[]) => void;
  onToggleVisibility: (field: string) => void;
  onSave: () => void;
  t: (key: string) => string;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  editingData,
  onChange,
  onToggleVisibility,
  onSave,
  t,
}: EditProfileModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="profileSection" aria-labelledby="edit-profile-title">
        <h2 id="edit-profile-title" className="title">
          {t('common.editProfile')}
        </h2>

        <form className="formGroup" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
          {/* Alias */}
          <div className="fieldRow">
            <label htmlFor="alias">{t('profile.alias')}</label>
            <input
              id="alias"
              className="inputField"
              value={editingData.alias}
              onChange={(e) => onChange('alias', e.target.value)}
            />
            <button
              type="button"
              className="visibilityToggle"
              onClick={() => onToggleVisibility('alias')}
              aria-label={t('toggleVisibility')}
            >
              {editingData.visibility.alias ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          {/* Birthdate */}
          <div className="fieldRow">
            <label htmlFor="birthdate">{t('profile.birthdate')}</label>
            <input
              id="birthdate"
              type="date"
              className="inputField"
              value={editingData.birthdate}
              onChange={(e) => onChange('birthdate', e.target.value)}
            />
            <button
              type="button"
              className="visibilityToggle"
              onClick={() => onToggleVisibility('birthdate')}
              aria-label={t('toggleVisibility')}
            >
              {editingData.visibility.birthdate ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          {/* Gender */}
          <div className="fieldRow">
            <label htmlFor="gender">{t('profile.genderLabel')}</label>
            <select
              id="gender"
              className="inputField"
              value={editingData.gender}
              onChange={(e) => onChange('gender', e.target.value)}
            >
              <option value="">{t('notProvided')}</option>
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
              <option value="other">{t('other')}</option>
            </select>
            <button
              type="button"
              className="visibilityToggle"
              onClick={() => onToggleVisibility('gender')}
              aria-label={t('toggleVisibility')}
            >
              {editingData.visibility.gender ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          {/* Interests */}
          <div className="fieldRow">
            <label htmlFor="interests">{t('profile.interests')}</label>
            <input
              id="interests"
              className="inputField"
              placeholder="Photography, Coding"
              value={editingData.interests.join(', ')}
              onChange={(e) =>
                onChange('interests', e.target.value.split(',').map((s) => s.trim()))
              }
            />
            <button
              type="button"
              className="visibilityToggle"
              onClick={() => onToggleVisibility('interests')}
              aria-label={t('toggleVisibility')}
            >
              {editingData.visibility.interests ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          {/* Skills */}
          <div className="fieldRow">
            <label htmlFor="skills">{t('profile.skills')}</label>
            <input
              id="skills"
              className="inputField"
              placeholder="JavaScript, UI Design"
              value={editingData.skills.join(', ')}
              onChange={(e) =>
                onChange('skills', e.target.value.split(',').map((s) => s.trim()))
              }
            />
            <button
              type="button"
              className="visibilityToggle"
              onClick={() => onToggleVisibility('skills')}
              aria-label={t('toggleVisibility')}
            >
              {editingData.visibility.skills ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          {/* Save Button */}
          <div className="modalActions">
            <button type="submit" className="glassbutton">
              <FiCheckCircle className="icon" /> {t('common.save')}
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
}
