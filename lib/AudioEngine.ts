export class AudioEngine {
  private ctx: AudioContext | null = null;
  private humOscillator: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  
  private noiseSource: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;

  private isInitialized = false;
  private tensionLevel = 0; // 0.0 to 1.0

  public initialize() {
    if (this.isInitialized) return;
    
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Setup Hum
      this.humOscillator = this.ctx.createOscillator();
      this.humGain = this.ctx.createGain();
      
      this.humOscillator.type = 'triangle';
      this.humOscillator.frequency.value = 55; // Deep hum
      
      this.humGain.gain.value = 0.05; // Start very quiet
      
      this.humOscillator.connect(this.humGain);
      this.humGain.connect(this.ctx.destination);
      this.humOscillator.start();

      // Setup Buzz (Filtered White Noise)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      this.noiseSource = this.ctx.createBufferSource();
      this.noiseSource.buffer = noiseBuffer;
      this.noiseSource.loop = true;
      
      this.noiseFilter = this.ctx.createBiquadFilter();
      this.noiseFilter.type = 'highpass';
      this.noiseFilter.frequency.value = 3000;
      
      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.value = 0.01; // Extremely subtle

      this.noiseSource.connect(this.noiseFilter);
      this.noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(this.ctx.destination);
      this.noiseSource.start();

      this.isInitialized = true;
    } catch (e) {
      console.warn("Audio Context setup failed", e);
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    } else if (!this.isInitialized) {
      this.initialize();
    }
  }

  // Set tension from 0.0 to 1.0 based on cumulative error
  public setTension(level: number) {
    this.tensionLevel = Math.max(0, Math.min(1, level));
    if (!this.ctx || !this.isInitialized) return;

    // Modulate hum frequency (55Hz -> 85Hz) and volume
    const newFreq = 55 + (this.tensionLevel * 30);
    const newHumGain = 0.05 + (this.tensionLevel * 0.1);
    
    this.humOscillator?.frequency.linearRampToValueAtTime(newFreq, this.ctx.currentTime + 1);
    this.humGain?.gain.linearRampToValueAtTime(newHumGain, this.ctx.currentTime + 1);

    // Modulate buzz intensity 
    const newBuzzGain = 0.01 + (this.tensionLevel * 0.05);
    this.noiseGain?.gain.linearRampToValueAtTime(newBuzzGain, this.ctx.currentTime + 1);
  }

  // Trigger a typewriter keystroke sound
  public playClick() {
    if (!this.ctx || !this.isInitialized) return;
    
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    const clickFilter = this.ctx.createBiquadFilter();

    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(800 + Math.random() * 200, this.ctx.currentTime);
    clickOsc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.02);

    clickFilter.type = 'highpass';
    clickFilter.frequency.value = 1000;

    clickGain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    clickOsc.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(this.ctx.destination);

    clickOsc.start();
    clickOsc.stop(this.ctx.currentTime + 0.06);
  }
}

// Export singleton instance
export const audioEngine = new AudioEngine();
