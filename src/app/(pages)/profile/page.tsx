'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { app } from '@/lib/firebase';
import { useLang } from '@/i18n/LanguageProvider';
import '@/styles/pages/profile.css';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import {
  getDatabase,
  ref as dbRef,
  get as dbGet,
  set as dbSet,
  update as dbUpdate,
} from 'firebase/database';
import { FiEdit, FiLogOut } from 'react-icons/fi';
import { MdPostAdd } from 'react-icons/md';
import EditProfileModal from '@/components/profile/ProfileEditModal';

const defaultProfile = {
  alias: '',
  birthdate: '',
  gender: '',
  interests: [],
  skills: [],
  visibility: {
    alias: true,
    birthdate: false,
    gender: false,
    interests: true,
    skills: true,
  },
};

function ProfileField({
  label,
  value,
  visible,
  t,
}: {
  label: string;
  value: string | string[];
  visible: boolean;
  t: (key: string) => string;
}) {
  return (
    <p className="profileField">
      <strong>{label}:</strong>{' '}
      {visible
        ? value && value.length > 0
          ? value
          : t('notProvided')
        : <em>{t('hidden')}</em>}
    </p>
  );
}

export default function ProfilePage() {
  const { t } = useLang();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState<any>(defaultProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const db = getDatabase(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setCurrentUser(user);

        const userData = {
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '/default-avatar.png',
        };

        const userRef = dbRef(db, `users/${user.uid}`);
        const snapshot = await dbGet(userRef);

        if (!snapshot.exists()) {
          await dbSet(userRef, {
            ...userData,
            ...defaultProfile,
            createdAt: new Date().toISOString(),
          });
        } else {
          const saved = snapshot.val();
          setUserInfo(saved);
          setEditingData({
            alias: saved.alias || '',
            birthdate: saved.birthdate || '',
            gender: saved.gender || '',
            interests: saved.interests || [],
            skills: saved.skills || [],
            visibility: saved.visibility || defaultProfile.visibility,
          });
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    router.push('/login');
  };

  const toggleModal = () => setShowModal(!showModal);

  const handleFieldChange = (field: string, value: string | string[]) => {
    setEditingData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleVisibilityToggle = (field: string) => {
    setEditingData((prev: any) => ({
      ...prev,
      visibility: {
        ...prev.visibility,
        [field]: !prev.visibility[field],
      },
    }));
  };

  const saveProfile = async () => {
    if (!currentUser) return;
    const db = getDatabase(app);
    const userRef = dbRef(db, `users/${currentUser.uid}`);
    await dbUpdate(userRef, editingData);
    setUserInfo((prev: any) => ({ ...prev, ...editingData }));
    toggleModal();
  };

  if (loading) return <p className="loading">{t('common.loading')}</p>;

  return (
    <main className="profileContainer">
      {currentUser && userInfo && (
        <>
          <div className="topBar">
            <button onClick={handleLogout} className="glassbutton" aria-label={t('common.logout')}>
              <FiLogOut className="icon" /> <span className="label">{t('common.logout')}</span>
            </button>
          </div>

          <section className="profileSection">
            <h1 className="profileTitle">{t('profile.title')}</h1>
            <div className="userCard">
              <img
                src={userInfo.photoURL}
                alt={`Avatar of ${userInfo.displayName}`}
                className="userAvatar"
              />
              <p>{userInfo.displayName}</p>
              {userInfo.email && <p>{userInfo.email}</p>}

              <div className="infoBlock">
                <ProfileField label={t('profile.alias')} value={userInfo.alias} visible={userInfo.visibility?.alias} t={t} />
                <ProfileField label={t('profile.birthdate')} value={userInfo.birthdate} visible={userInfo.visibility?.birthdate} t={t} />
                <ProfileField label={t('profile.genderLabel')} value={userInfo.gender} visible={userInfo.visibility?.gender} t={t} />
                <ProfileField label={t('profile.interests')} value={userInfo.interests?.join(', ')} visible={userInfo.visibility?.interests} t={t} />
                <ProfileField label={t('profile.skills')} value={userInfo.skills?.join(', ')} visible={userInfo.visibility?.skills} t={t} />
              </div>

              <div className="editButtonWrapper">
                <button onClick={toggleModal} className="glassbutton">
                  <FiEdit className="icon" /> <span className="label">{t('common.editProfile')}</span>
                </button>
              </div>

              <div>
                <button className="glassbutton" onClick={() => router.push('/articles/new')}>
                  <span className="icon"><MdPostAdd /></span>
                  <span className="label">{t('article.create')}</span>
                </button>
              </div>
              <div>
                {/* <button className="glassbutton" onClick={() => router.push('/mindscape/new')}>
                  <span className="icon"><MdPostAdd /></span>
                  <span className="label">{t('mindscape.create')}</span>
                </button> */}
              </div>
            </div>
          </section>

          <EditProfileModal
            isOpen={showModal}
            onClose={toggleModal}
            editingData={editingData}
            onChange={handleFieldChange}
            onToggleVisibility={handleVisibilityToggle}
            onSave={saveProfile}
            t={t}
          />
        </>
      )}
    </main>
  );
}
