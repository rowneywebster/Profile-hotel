import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Profile = () => {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    bio: '',
    avatar: '👤',
    dietaryPreferences: [],
    allergies: [],
    favoriteLocations: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');

  const avatars = [
    { emoji: '👨', label: 'Man' },
    { emoji: '👩', label: 'Woman' },
    { emoji: '🧔', label: 'Bearded person' },
    { emoji: '👨‍🦳', label: 'Older man' },
    { emoji: '👩‍🦰', label: 'Red-haired woman' },
    { emoji: '🦸', label: 'Superhero' },
    { emoji: '🧑‍🍳', label: 'Chef' },
    { emoji: '🧝', label: 'Elf' }
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 
    'Keto', 'Paleo', 'Halal', 'Kosher'
  ];

  const commonAllergies = [
    'Dairy', 'Nuts', 'Shellfish', 
    'Eggs', 'Soy', 'Wheat', 'Fish'
  ];

  const locations = ['Westlands', 'Dagoretti Rd', 'Mombasa Rd','Karen', 'Hurlingham', 'Koinange st'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (avatar) => {
    setProfile(prev => ({ ...prev, avatar }));
  };

  const handlePreferenceToggle = (preference) => {
    setProfile(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter(p => p !== preference)
        : [...prev.dietaryPreferences, preference]
    }));
  };

  const handleAllergyToggle = (allergy) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const handleLocationToggle = (location) => {
    setProfile(prev => ({
      ...prev,
      favoriteLocations: prev.favoriteLocations.includes(location)
        ? prev.favoriteLocations.filter(l => l !== location)
        : [...prev.favoriteLocations, location]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Profile saved:', profile);
      navigate('/profile-success');
    } catch (err) {
      setError('Failed to save profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return (
    <div className="error-state">
      <h3>Oops!</h3>
      <p>{error}</p>
      <button onClick={() => setError(null)}>Try Again</button>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
        <h1>Your Profile</h1>
      </div>

      <div className="profile-tabs">
        <button 
          className={activeTab === 'basic' ? 'active' : ''}
          onClick={() => setActiveTab('basic')}
        >
          Basic Info
        </button>
        <button 
          className={activeTab === 'preferences' ? 'active' : ''}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'basic' && (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="avatar-section">
              <h3>Select Your Avatar</h3>
              <div className="avatar-grid">
                {avatars.map(({ emoji, label }) => (
                  <button
                    key={label}
                    type="button"
                    className={`avatar-option ${profile.avatar === emoji ? 'selected' : ''}`}
                    onClick={() => handleAvatarSelect(emoji)}
                    aria-label={label}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                placeholder="+254720078767"
                pattern="[+][0-9]{11,14}"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio (Optional)</label>
              <textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                placeholder="Tell us a bit about yourself..."
                rows="3"
                maxLength="200"
              />
              <small className="char-count">{profile.bio.length}/200 characters</small>
            </div>
          </form>
        )}

        {activeTab === 'preferences' && (
          <div className="preferences-section">
            <div className="preference-group">
              <h3>Dietary Preferences</h3>
              <div className="preference-grid">
                {dietaryOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    className={`preference-option ${profile.dietaryPreferences.includes(option) ? 'selected' : ''}`}
                    onClick={() => handlePreferenceToggle(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="preference-group">
              <h3>Allergies</h3>
              <div className="preference-grid">
                {commonAllergies.map(allergy => (
                  <button
                    key={allergy}
                    type="button"
                    className={`preference-option ${profile.allergies.includes(allergy) ? 'selected' : ''}`}
                    onClick={() => handleAllergyToggle(allergy)}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>

            <div className="preference-group">
              <h3>Favorite Dining Locations</h3>
              <div className="preference-grid">
                {locations.map(location => (
                  <button
                    key={location}
                    type="button"
                    className={`preference-option ${profile.favoriteLocations.includes(location) ? 'selected' : ''}`}
                    onClick={() => handleLocationToggle(location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="profile-preview">
          <div className="preview-card">
            <div className="preview-header">
              <span className="avatar-large">{profile.avatar}</span>
              <div className="preview-info">
                <h3>{profile.name || 'Your Name'}</h3>
                <p>{profile.phone || '+1234567890'}</p>
                {profile.bio && <p className="bio-preview">{profile.bio}</p>}
              </div>
            </div>
            
            {(profile.dietaryPreferences.length > 0 || 
              profile.allergies.length > 0 ||
              profile.favoriteLocations.length > 0) && (
              <div className="preview-details">
                {profile.dietaryPreferences.length > 0 && (
                  <div className="detail-group">
                    <h4>Dietary Preferences</h4>
                    <p>{profile.dietaryPreferences.join(', ')}</p>
                  </div>
                )}
                {profile.allergies.length > 0 && (
                  <div className="detail-group">
                    <h4>Allergies</h4>
                    <p>{profile.allergies.join(', ')}</p>
                  </div>
                )}
                {profile.favoriteLocations.length > 0 && (
                  <div className="detail-group">
                    <h4>Favorite Dining Areas</h4>
                    <p>{profile.favoriteLocations.join(', ')}</p>
                    <div className="location-tips">
                      {profile.favoriteLocations.includes('Westlands') && (
                        <small>• Try Lucca for Italian, Seven Seafood & Grill's or Sankara for rooftop dining</small>
                      )}
                      {profile.favoriteLocations.includes('Dagoretti Rd') && (
                        <small>• Check out  La Cascina </small>
                      )}
                      {profile.favoriteLocations.includes('Mombasa Rd') && (
                        <small>• Try Big Five Restaurant & Bar </small>
                      )}
                      {profile.favoriteLocations.includes('Karen') && (
                        <small>• Check out Talisman's risotto or La Cascina's pasta</small>
                      )}
                      {profile.favoriteLocations.includes('Hurlingham') && (
                        <small>• Habesha has amazing Ethiopian food</small>
                      )}
                      {profile.favoriteLocations.includes('Koinange st') && (
                        <small>• CJ's has amazing African food</small>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className="save-button" 
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span> Saving...
          </>
        ) : (
          'Save Profile'
        )}
      </button>
    </div>
  );
};

export default Profile;