'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/i18n/LanguageProvider';
import { firestore } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import '@/styles/forms/createTODO.css';

// 型別定義
type LangText = { zh: string; en: string };
type MediaType = 'image' | 'video' | 'other' | 'unknown';
type LinkItem = { text: LangText; url: string };
type MediaItem = { type: MediaType; url: string; alt_text: string };
type MindscapeType = 'website' | 'personal' | 'other';
type MindscapeStatus = 'completed' | 'in_progress' | 'pending';
type ImpactLevel = 'low' | 'medium' | 'high';

interface FormState {
    title: LangText;
    content: LangText;
    type: MindscapeType;
    status: MindscapeStatus;
    impact_level: ImpactLevel;
    category?: string;
    tags: string[];
    expertise: string[];
    media: MediaItem[];
    links: LinkItem[];
    completed_at?: string;
}

export default function CreateMindscapePage() {
    const { t } = useLang();
    const router = useRouter();

    const [formData, setFormData] = useState<FormState>({
        title: { zh: '', en: '' },
        content: { zh: '', en: '' },
        type: 'personal',
        status: 'pending',
        impact_level: 'medium',
        category: '',
        tags: [],
        expertise: [],
        media: [],
        links: [],
        completed_at: '',
    });

    const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const docRef = await addDoc(collection(firestore, 'mindscapes'), {
            ...formData,
            id: Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
            created_at: new Date().toISOString(),
        });
        router.push(`/mindscapes/${docRef.id}`);
    };

    return (
        <main className="formContainer">
            <h1>{t('mindscape.create')}</h1>

            {/* Title */}
            <label>{t('mindscape.titleZh')}</label>
            <input
                type="text"
                value={formData.title.zh}
                onChange={(e) => handleChange('title', { ...formData.title, zh: e.target.value })}
            />
            <label>{t('mindscape.titleEn')}</label>
            <input
                type="text"
                value={formData.title.en}
                onChange={(e) => handleChange('title', { ...formData.title, en: e.target.value })}
            />

            {/* Content */}
            <label>{t('mindscape.contentZh')}</label>
            <textarea
                value={formData.content.zh}
                onChange={(e) => handleChange('content', { ...formData.content, zh: e.target.value })}
            />
            <label>{t('mindscape.contentEn')}</label>
            <textarea
                value={formData.content.en}
                onChange={(e) => handleChange('content', { ...formData.content, en: e.target.value })}
            />

            {/* Category */}
            <label>{t('mindscape.category')}</label>
            <input
                type="text"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
            />

            {/* Type */}
            <label>{t('mindscape.type')}</label>
            <select value={formData.type} onChange={(e) => handleChange('type', e.target.value as MindscapeType)}>
                <option value="website">{t('mindscape.typeWebsite')}</option>
                <option value="personal">{t('mindscape.typePersonal')}</option>
                <option value="other">{t('mindscape.typeOther')}</option>
            </select>

            {/* Status */}
            <label>{t('mindscape.status')}</label>
            <select value={formData.status} onChange={(e) => handleChange('status', e.target.value as MindscapeStatus)}>
                <option value="pending">{t('mindscape.statusPending')}</option>
                <option value="in_progress">{t('mindscape.statusInProgress')}</option>
                <option value="completed">{t('mindscape.statusCompleted')}</option>
            </select>

            {/* Completed At */}
            <label>{t('mindscape.completedAt')}</label>
            <input
                type="datetime-local"
                value={formData.completed_at}
                onChange={(e) => handleChange('completed_at', e.target.value)}
            />

            {/* Impact Level */}
            <label>{t('mindscape.impact')}</label>
            <select value={formData.impact_level} onChange={(e) => handleChange('impact_level', e.target.value as ImpactLevel)}>
                <option value="low">{t('mindscape.impactLow')}</option>
                <option value="medium">{t('mindscape.impactMedium')}</option>
                <option value="high">{t('mindscape.impactHigh')}</option>
            </select>

            {/* Tags */}
            <label>{t('mindscape.tags')}</label>
            {formData.tags.map((tag, idx) => (
                <input
                    key={idx}
                    type="text"
                    value={tag}
                    onChange={(e) => {
                        const updated = [...formData.tags];
                        updated[idx] = e.target.value;
                        handleChange('tags', updated);
                    }}
                />
            ))}
            <button type="button" onClick={() => handleChange('tags', [...formData.tags, ''])}>
                {t('common.addTag')}
            </button>

            {/* Expertise */}
            <label>{t('mindscape.expertise')}</label>
            {formData.expertise.map((skill, idx) => (
                <input
                    key={idx}
                    type="text"
                    value={skill}
                    onChange={(e) => {
                        const updated = [...formData.expertise];
                        updated[idx] = e.target.value;
                        handleChange('expertise', updated);
                    }}
                />
            ))}
            <button type="button" onClick={() => handleChange('expertise', [...formData.expertise, ''])}>
                {t('common.addSkill')}
            </button>

            {/* Media */}
            <label>{t('mindscape.media')}</label>
            {formData.media.map((media, idx) => (
                <div key={idx}>
                    <select
                        value={media.type}
                        onChange={(e) => {
                            const updated = [...formData.media];
                            updated[idx] = { ...updated[idx], type: e.target.value as MediaType };
                            handleChange('media', updated);
                        }}
                    >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="other">Other</option>
                        <option value="unknown">Unknown</option>
                    </select>
                    <input
                        type="text"
                        placeholder="URL"
                        value={media.url}
                        onChange={(e) => {
                            const updated = [...formData.media];
                            updated[idx] = { ...updated[idx], url: e.target.value };
                            handleChange('media', updated);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Alt text"
                        value={media.alt_text}
                        onChange={(e) => {
                            const updated = [...formData.media];
                            updated[idx] = { ...updated[idx], alt_text: e.target.value };
                            handleChange('media', updated);
                        }}
                    />
                </div>
            ))}
            <button type="button" onClick={() => handleChange('media', [...formData.media, { type: 'image', url: '', alt_text: '' }])}>
                {t('common.addMedia')}
            </button>

            {/* Links */}
            <label>{t('mindscape.links')}</label>
            {formData.links.map((link, idx) => (
                <div key={idx}>
                    <input
                        type="text"
                        placeholder="Text (zh)"
                        value={link.text.zh}
                        onChange={(e) => {
                            const updated = [...formData.links];
                            updated[idx] = { ...updated[idx], text: { ...updated[idx].text, zh: e.target.value } };
                            handleChange('links', updated);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Text (en)"
                        value={link.text.en}
                        onChange={(e) => {
                            const updated = [...formData.links];
                            updated[idx] = { ...updated[idx], text: { ...updated[idx].text, en: e.target.value } };
                            handleChange('links', updated);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => {
                            const updated = [...formData.links];
                            updated[idx] = { ...updated[idx], url: e.target.value };
                            handleChange('links', updated);
                        }}
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    handleChange('links', [
                        ...formData.links,
                        { text: { zh: '', en: '' }, url: '' },
                    ])
                }
            >
                {t('common.addLink')}
            </button>

            {/* Submit */}
            <button className="glassbutton" onClick={handleSubmit}>
                {t('common.submit')}
            </button>
        </main>
    );
}
