export function getFrequency( buf, sampleRate ) {
    var MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
    var GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be
    
    var SIZE = buf.length;
    var MAX_SAMPLES = Math.floor(SIZE/2);
    var best_offset = -1;
    var best_correlation = 0;
    var rms = 0;
    var foundGoodCorrelation = false;
    var correlations = new Array(MAX_SAMPLES);

    for (var i=0;i<SIZE;i++) {
        var val = buf[i];
        rms += val*val;
    }
    rms = Math.sqrt(rms/SIZE);
    if (rms<0.01) // not enough signal
        return -1;

    var lastCorrelation=1;
    for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
        var correlation = 0;

        for (var i=0; i<MAX_SAMPLES; i++) {
            correlation += Math.abs((buf[i])-(buf[i+offset]));
        }
        correlation = 1 - (correlation/MAX_SAMPLES);
        correlations[offset] = correlation; // store it, for the tweaking we need to do below.
        if ((correlation>GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
            foundGoodCorrelation = true;
            if (correlation > best_correlation) {
                best_correlation = correlation;
                best_offset = offset;
            }
        } else if (foundGoodCorrelation) {
            var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];  
            return parseInt(sampleRate/(best_offset+(8*shift)));
        }
        lastCorrelation = correlation;
    }
    if (best_correlation > 0.01) {
        return sampleRate/best_offset;
    }
    return -1;
}

const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
export function noteFromFrequency( frequency ) {
    var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
    return Math.round( noteNum ) + 49;
}

export function getNoteKey(frequency){
    if(frequency>0 && frequency<=4190){
        const note=noteFromFrequency(frequency)
        return `${noteStrings[note % 12]}${parseInt(note/12)}`
    }
    return ''
}

export function getPianoKey(fr){
    if(fr<0 || fr>4187)
        return -1

    return Panio_Keys.findIndex(a=>fr>=a-0.5 && fr<=a+0.5)
}

const Panio_Keys=[
    27.5,
    29.1352,
    30.8677,
    32.7032,
    34.6478,
    36.7081,
    38.8909,
    41.2034,
    43.6535,
    46.2493,
    48.9994,
    51.9131,
    55,
    58.2705,
    61.7354,
    65.4064,
    69.2957,
    73.4162,
    77.7817,
    82.4069,
    87.3071,
    92.4986,
    97.9989,
    103.826,
    110,
    116.541,
    123.471,
    130.813,
    138.591,
    146.832,
    155.563,
    164.814,
    174.614,
    184.997,
    195.998,
    207.652,
    220,
    233.082,
    246.942,
    261.626,
    277.183,
    293.665,
    311.127,
    329.628,
    349.228,
    369.994,
    391.995,
    415.305,
    440,
    466.164,
    493.883,
    523.251,
    554.365,
    587.33,
    622.254,
    659.255,
    698.456,
    739.989,
    783.991,
    830.609,
    880,
    932.328,
    987.767,
    1046.5,
    1108.73,
    1174.66,
    1244.51,
    1318.51,
    1396.91,
    1479.98,
    1567.98,
    1661.22,
    1760,
    1864.66,
    1975.53,
    2093,
    2217.46,
    2349.32,
    2489.02,
    2637.02,
    2793.83,
    2959.96,
    3135.96,
    3322.44,
    3520,
    3729.31,
    3951.07,
    4186.01,
]



