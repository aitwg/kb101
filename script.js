const keyboard = document.querySelector('.keyboard');
    const keys = document.querySelectorAll('.key');
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playNote(note) {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
    
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
    
      oscillator.type = 'sine';
      oscillator.frequency.value = getFrequency(note);
      gainNode.gain.value = 0.2;
    
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);
      oscillator.stop(audioContext.currentTime + 1);
    }
    
    function getFrequency(note) {
      const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      const octave = parseInt(note.slice(-1));
      const noteName = note.slice(0, -1);
      const noteIndex = notes.indexOf(noteName);
    
      const baseFrequency = 440;
      const semitonesFromA4 = (octave - 4) * 12 + (noteIndex - notes.indexOf('A'));
      return baseFrequency * Math.pow(2, semitonesFromA4 / 12);
    }
    
    keys.forEach(key => {
      key.addEventListener('mousedown', () => {
        const note = key.dataset.note;
        playNote(note);
      });
    });
