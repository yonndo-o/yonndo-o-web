"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/lib/firebase";
import { useLang } from "@/i18n/LanguageProvider";
import styles from "./profile.module.css";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import {
  getDatabase,
  ref as dbRef,
  get as dbGet,
  set as dbSet,
  update as dbUpdate,
} from "firebase/database";
import { FiEdit, FiEye, FiEyeOff, FiLogOut, FiPlus, FiCheckCircle } from "react-icons/fi";
import Modal from "@/components/ui/Modal/Modal";

const defaultProfile = {
  alias: "",
  birthdate: "",
  gender: "",
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

export default function ProfilePage() {
  const { t } = useLang();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState<any>(defaultProfile);

  useEffect(() => {
    const auth = getAuth(app);
    const db = getDatabase(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCurrentUser(user);

        const userData = {
          uid: user.uid,
          displayName: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "/default-avatar.png",
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
            alias: saved.alias || "",
            birthdate: saved.birthdate || "",
            gender: saved.gender || "",
            interests: saved.interests || [],
            skills: saved.skills || [],
            visibility: saved.visibility || defaultProfile.visibility,
          });
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    router.push("/login");
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

  const renderField = (label: string, value: string | string[], visible: boolean) => {
    return (
      <p>
        <strong>{label}:</strong> {visible ? (value && value.length > 0 ? value : t("notProvided")) : <em>{t("hidden")}</em>}
      </p>
    );
  };

  return (
    <main className={styles.container}>
      {currentUser && userInfo && (
        <>
          <div className={styles.topBar}>
            <button onClick={handleLogout} className="glassbutton" aria-label={t("common.logout")}>
              <FiLogOut className="icon" /> <span className="label">{t("common.logout")}</span>
            </button>

            {/* <button onClick={toggleModal} className="glassbutton">
              <FiEdit className="icon" /> <span className="label">{t("editProfile")}</span>
            </button> */}
          </div>

          <section className={styles.profileSection}>
            <h1>{t("profile.title")}</h1>
            <div className={styles.userCard}>
              <img
                src={userInfo.photoURL}
                alt={`Avatar of ${userInfo.displayName}`}
                className={styles.userAvatar}
              />
              <p>{userInfo.displayName}</p>
              {userInfo.email && <p>{userInfo.email}</p>}

              {renderField(t("profile.alias"), userInfo.alias, userInfo.visibility?.alias)}
              {renderField(t("profile.birthdate"), userInfo.birthdate, userInfo.visibility?.birthdate)}
              {renderField(t("profile.genderLabel"), userInfo.gender, userInfo.visibility?.gender)}
              {renderField(t("profile.interests"), userInfo.interests?.join(", "), userInfo.visibility?.interests)}
              {renderField(t("profile.skills"), userInfo.skills?.join(", "), userInfo.visibility?.skills)}
              <div className={styles.editButtonWrapper}>
                <button onClick={toggleModal} className="glassbutton">
                  <FiEdit className="icon" /> <span className="label">{t("common.editProfile")}</span>
                </button>
              </div>
            </div>
          </section>

          <Modal isOpen={showModal} onClose={toggleModal}>
            <div className={styles.modalContent}>
              <h2>{t("common.editProfile")}</h2>

              <div className={styles.formGroup}>
                {/* Alias */}
                <div className={styles.fieldRow}>
                  <label htmlFor="alias">{t("profile.alias")}</label>
                  <input
                    id="alias"
                    value={editingData.alias}
                    onChange={(e) => handleFieldChange("alias", e.target.value)}
                  />
                  <button onClick={() => handleVisibilityToggle("alias")}>
                    {editingData.visibility.alias ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>

                {/* Birthdate */}
                <div className={styles.fieldRow}>
                  <label htmlFor="birthdate">{t("profile.birthdate")}</label>
                  <input
                    id="birthdate"
                    type="date"
                    value={editingData.birthdate}
                    onChange={(e) => handleFieldChange("birthdate", e.target.value)}
                  />
                  <button onClick={() => handleVisibilityToggle("birthdate")}>
                    {editingData.visibility.birthdate ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>

                {/* Gender */}
                <div className={styles.fieldRow}>
                  <label htmlFor="gender">{t("profile.genderLabel")}</label>
                  <select
                    id="gender"
                    value={editingData.gender}
                    onChange={(e) => handleFieldChange("gender", e.target.value)}
                  >
                    <option value="">{t("notProvided")}</option>
                    <option value="male">{t("male")}</option>
                    <option value="female">{t("female")}</option>
                    <option value="other">{t("other")}</option>
                  </select>
                  <button onClick={() => handleVisibilityToggle("gender")}>
                    {editingData.visibility.gender ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>

                {/* Interests */}
                <div className={styles.fieldRow}>
                  <label htmlFor="interests">{t("profile.interests")}</label>
                  <input
                    id="interests"
                    placeholder="Photography, Coding"
                    value={editingData.interests.join(", ")}
                    onChange={(e) =>
                      handleFieldChange(
                        "interests",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                  />
                  <button onClick={() => handleVisibilityToggle("interests")}>
                    {editingData.visibility.interests ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>

                {/* Skills */}
                <div className={styles.fieldRow}>
                  <label htmlFor="skills">{t("profile.skills")}</label>
                  <input
                    id="skills"
                    placeholder="JavaScript, UI Design"
                    value={editingData.skills.join(", ")}
                    onChange={(e) =>
                      handleFieldChange(
                        "skills",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                  />
                  <button onClick={() => handleVisibilityToggle("skills")}>
                    {editingData.visibility.skills ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>

                {/* Save Button */}
                <div className={styles.modalActions}>
                  <button onClick={saveProfile} className="glassbutton">
                    <FiCheckCircle className="icon" /> {t("common.save")}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </main>
  );
}