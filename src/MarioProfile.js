import React, { useState } from 'react';
import './MarioProfile.css';
import Timeline from './components/Timeline';
import Logo from './assets/Logo.png';
import ScoreBar from './components/ScoreBar';

const MarioProfile = () => {
  const [currentSection, setCurrentSection] = useState('');

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'Profile':
        return  <div className="koopa-message">
        <div className="koopa-title">Pims | Paris, France</div>
        <div className="koopa-content">
        Développement de nouvelles fonctionnalités et intégration dans des
        applications existantes en utilisant PHP et Zend Framework.<br/>
        Conception et développement d'interfaces utilisateur intuitives et
        réactives pour améliorer l'expérience utilisateur.<br/>
        Création et test de points d'accès API avec PHPUnit pour assurer la
        fiabilité et la performance des services.<br/>
        Conception de modèles Excel personnalisés pour répondre à des besoins
        spécifiques de traitement de données.<br/>
        Correction de bugs et optimisation des performances pour garantir le bon
        fonctionnement des applications.<br/>
        Rédaction de documentation technique détaillée pour faciliter la
        maintenance et l'évolution des projets.
        </div>
    </div>;
      case 'Experience':
        return <div>Professional Experience Details</div>;
      case 'Skills':
        return <div>Skills List</div>;
      case 'Education':
        return <div>Educational Background</div>;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="container">
      <div className="stage">
        <ScoreBar />
        <header>
          <img src={Logo} alt="Logo" />
          <h1>Full-Stack Developer</h1>
          <p id="info" className="info">(click the pipes!)</p>
        </header>
        <Timeline onPipeClick={setCurrentSection} />
      </div>
      <div id="ground" className="ground">
        <div id="grass" className="grass"></div>
        <div className="content">{renderSectionContent()}</div>
      </div>
    </div>
  );
};

export default MarioProfile;
