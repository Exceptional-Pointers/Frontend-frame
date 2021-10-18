const video = document.querySelector('video');
const audio = document.querySelector('audio');

const mediaToggle = document.querySelectorAll('.stream__media-control');
let micTrack = ''
// const switchVideoLabel = document.querySelector('.stream__mediaControl-video label');
// const switchVideoToggle = document.querySelector('.stream__mediaControl-video span');

mediaToggle.forEach((media) => {
    // switch comps
    let mediaLabel = media.querySelector('label')
    let mediaLabelSpan = media.querySelector('span')

    // switchLabel click event
    mediaLabel.addEventListener('click', function () {
        mediaLabelSpan.classList.toggle('active');
        if (mediaLabel.getAttribute('for') == 'video-toggle') {
            stream.getTracks().forEach(function (track) {
                if (track.kind === 'video') {
                    if (!mediaLabelSpan.classList.contains('active')) {
                        track.enabled = false;
                        console.log('video stopped', track);
                    } else {
                        track.enabled = true;
                        console.log('video started', track);
                    }
                }
            });
        } else if (mediaLabel.getAttribute('for') == 'audio-toggle') {
            stream.getTracks().forEach(function (track) {
                if (track.kind === 'audio') {
                    micTrack = track
                    if (!mediaLabelSpan.classList.contains('active')) {
                        track.enabled = false;
                        console.log('audio stopped', track);
                    } else {
                        track.enabled = true;
                        console.log('audio started', track);
                    }
                }
            });
        }
    })
})

navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    })
    .then(stream => {
        window.localStream = stream;
        video.srcObject = stream;
        audio.srcObject = stream;
    })
    .catch((err) => {
        console.log(err);
    });