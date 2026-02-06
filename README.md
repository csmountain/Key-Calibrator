# Key-Calibrator 🎸

A web-based program to test your ability to play within any given key via guitar. Practice chord progressions in all 12 major keys with customizable settings and chord modifications.

## Features

### Hub View
- **Reference Chart**: View all 12 major keys and their chord progressions at a glance
- **Complete Chord Information**: See all 7 diatonic chords (I, ii, iii, IV, V, vi, vii°) for each key
- **Proper Notation**: Uses correct enharmonic spellings (sharps/flats) for each key

### Practice Mode
- **Random Key Selection**: Practice in any of the 12 major keys
- **Customizable Progressions**: Choose how many chords (1-7) you want in each progression
- **Selective Chord Degrees**: Select which specific chord degrees to include in practice
- **Timed Practice**: Set a timer (1-60 seconds) before the answer is revealed
- **Chord Modifications**:
  - Convert V chord to minor (V → v)
  - Convert I chord to minor (I → i)
  - Convert IV chord to minor (IV → iv)
  - Add 7th extensions to all chords
- **Continuous Practice**: Generate new questions with the "Next Question" button

## How to Use

1. **Open the Application**: Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
2. **Hub View**: Click "Hub" to see all keys and their chord progressions as a reference
3. **Practice Mode**: Click "Practice Mode" to start practicing
4. **Configure Your Practice**:
   - Set how long you want before seeing the answer
   - Choose how many chords in the progression
   - Select which chord degrees to include
   - Optionally enable chord modifications
5. **Start Practicing**: Click "Start Practice" to begin
6. **Play Along**: When you see the key and roman numeral progression, try to play the correct chords
7. **Check Your Answer**: After the timer expires, the correct chords will be revealed
8. **Continue**: Click "Next Question" for a new challenge or "End Practice" to adjust settings

## Example Practice Session

**Question:**
- Key of D Major
- Progression: I - IV - vi

**Your Challenge:** Play D, G, and Bm chords in sequence

**Answer Revealed:** D → G → Bm (or D7 → G7 → Bm7 if 7th chords are enabled)

## Technical Details

- **No Installation Required**: Pure HTML, CSS, and JavaScript - no dependencies
- **Offline Capable**: Works without internet connection once loaded
- **Mobile Friendly**: Responsive design works on phones and tablets
- **Browser Compatible**: Works in all modern browsers

## Music Theory

The application follows standard music theory for major keys:
- **I**: Major chord (tonic)
- **ii**: Minor chord
- **iii**: Minor chord
- **IV**: Major chord (subdominant)
- **V**: Major chord (dominant)
- **vi**: Minor chord (relative minor)
- **vii°**: Diminished chord

## Contributing

Feel free to suggest improvements or report issues!
