const video = document.querySelector('video');
const audio = document.querySelector('audio');

const mediaToggle = document.querySelectorAll('.stream__media-control');
let vidsrc = video.src
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

            if (!mediaLabelSpan.classList.contains('active')) {
                stream.getTracks().forEach(function (track) {
                    if (track.kind === 'video') {
                        console.log('stoped', track);
                        track.stop();
                        video.src = '';
                    }
                });
            } else {
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
            }
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