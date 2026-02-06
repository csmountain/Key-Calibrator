import { useState, useEffect } from 'react'
import Chord from '@tombatossals/react-chords/lib/Chord'
import './App.css'
import guitarData from '../guitar.json'

// Music Theory Data
const KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
const CHORD_QUALITIES = ['', 'm', 'm', '', '', 'm', 'dim']
const ROMAN_NUMERALS = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']

const KEY_NOTES = {
  'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'C#': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
  'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
  'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
  'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
  'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
  'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
}

const INSTRUMENT = {
  strings: 6,
  fretsOnChord: 4,
  name: 'Guitar',
  keys: [],
  tunings: {
    standard: ['E', 'A', 'D', 'G', 'B', 'E']
  }
}

function getChord(key, degree, modifications = {}) {
  const keyNotes = KEY_NOTES[key]
  const root = keyNotes[degree]
  let quality = CHORD_QUALITIES[degree]
  let romanNumeral = ROMAN_NUMERALS[degree]

  if (modifications.vToMinor && degree === 4 && quality === '') {
    quality = 'm'
    romanNumeral = 'v'
  }
  if (modifications.iToMinor && degree === 0 && quality === '') {
    quality = 'm'
    romanNumeral = 'i'
  }
  if (modifications.ivToMinor && degree === 3 && quality === '') {
    quality = 'm'
    romanNumeral = 'iv'
  }
  if (modifications.add7) {
    quality += '7'
  }

  return {
    root,
    quality,
    full: root + quality,
    romanNumeral,
    degree: degree + 1
  }
}

function getKeyChords(key) {
  return ROMAN_NUMERALS.map((_, i) => getChord(key, i))
}

function getChordSuffix(quality) {
  if (quality === '') return 'major'
  if (quality === 'm') return 'minor'
  if (quality === 'dim') return 'dim'
  if (quality === '7') return '7'
  if (quality === 'm7') return 'm7'
  if (quality === 'dim7') return 'dim7'
  return 'major'
}

function ChordDiagram({ chordData }) {
  if (!chordData || !chordData.frets) {
    return <div style={{ color: '#999', padding: '20px' }}>No diagram available</div>
  }

  const chord = {
    frets: chordData.frets,
    fingers: chordData.fingers,
    barres: chordData.barres || [],
    capo: chordData.capo || false,
    baseFret: chordData.baseFret || 1
  }

  return (
    <div className="chord-wrapper">
      <Chord chord={chord} instrument={INSTRUMENT} lite={false} />
    </div>
  )
}

function ChordDetailModal({ selectedKey, onClose }) {
  if (!selectedKey) return null

  const chords = getKeyChords(selectedKey)

  const findChordData = (chordName) => {
    if (!guitarData || !guitarData.chords) return null
    if (guitarData.chords[chordName]) {
      return guitarData.chords[chordName]
    }
    const root = chordName.replace(/major|m|dim|7/g, '').trim()
    if (guitarData.chords[root]) {
      return guitarData.chords[root]
    }
    return null
  }

  return (
    <div className="chord-detail-view" onClick={(e) => {
      if (e.target.className === 'chord-detail-view') onClose()
    }}>
      <div className="chord-detail-content">
        <div className="chord-detail-header">
          <h2>🎸 Chord Diagrams for {selectedKey} Major</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="chord-diagrams-grid">
          {chords.map((chord, idx) => {
            const chordDataArray = findChordData(chord.root)
            const suffix = getChordSuffix(chord.quality)
            let positions = []

            if (chordDataArray) {
              const matchingChords = chordDataArray.filter(c => c.suffix === suffix)
              if (matchingChords.length > 0 && matchingChords[0].positions) {
                positions = matchingChords[0].positions.slice(0, 4)
              }
            }

            return (
              <div key={idx} className="chord-diagram-section">
                <h3>{chord.romanNumeral} - {chord.full}</h3>
                <div className="chord-variations">
                  {positions.length > 0 ? (
                    positions.map((pos, posIdx) => (
                      <div key={posIdx} className="chord-diagram-wrapper">
                        <div className="position-label">Position {posIdx + 1}</div>
                        <ChordDiagram chordData={pos} />
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#999' }}>No diagram data found</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function KeyCard({ keyName, onClick }) {
  const chords = getKeyChords(keyName)

  return (
    <div className="key-card" onClick={onClick}>
      <h3>Key of {keyName} Major</h3>
      <ul className="chord-list">
        {chords.map((chord, idx) => (
          <li key={idx}>
            <span className="chord-number">{chord.romanNumeral}:</span> {chord.full}
          </li>
        ))}
      </ul>
      <p style={{ marginTop: '15px', color: '#667eea', fontSize: '0.9em' }}>
        👆 Click to view chord diagrams
      </p>
    </div>
  )
}

function App() {
  const [currentView, setCurrentView] = useState('hub')
  const [selectedKey, setSelectedKey] = useState(null)

  return (
    <div className="container">
      <header>
        <h1>🎸 Key Calibrator</h1>
        <p className="subtitle">Test your ability to play in any key with any progression</p>
      </header>

      <div className="nav">
        <button 
          className={currentView === 'hub' ? 'active' : ''}
          onClick={() => setCurrentView('hub')}
        >
          Hub
        </button>
        <button 
          className={currentView === 'practice' ? 'active' : ''}
          onClick={() => setCurrentView('practice')}
        >
          Practice Mode
        </button>
      </div>

      <div className="content">
        {currentView === 'hub' && (
          <div className="view active">
            <h2>All Keys and Chord Progressions</h2>
            <div className="keys-grid">
              {KEYS.map(key => (
                <KeyCard 
                  key={key} 
                  keyName={key} 
                  onClick={() => setSelectedKey(key)}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'practice' && (
          <div className="view active">
            <div className="practice-setup">
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Practice Setup</h2>
              <p style={{ textAlign: 'center', color: '#666' }}>
                Practice mode coming soon...
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedKey && (
        <ChordDetailModal 
          selectedKey={selectedKey}
          onClose={() => setSelectedKey(null)}
        />
      )}
    </div>
  )
}

export default App
