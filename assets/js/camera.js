// Video and audio selectors
const video = document.querySelector('video');
const audio = document.querySelector('audio');

// Video and Mic Toggle btns
const mediaToggle = document.querySelectorAll('.stream__media-control');

mediaToggle.forEach((media) => {
    // Video and Mic toggle labels and spans inside the tag
    let mediaLabel = media.querySelector('label')
    let mediaLabelSpan = media.querySelector('span')

    // Video and Mic toggle click event
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

// Getting Audio and Video permissions
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

// Media Devices Setting Toggle
const cameraPageBody = document.querySelector('.camera-page-body')
const mediaSettingToggleBtn = document.querySelector('.mediaSettingsToggle')
const mediaSettingCloseBtn = document.querySelector('.settings__close')
const mediaSettingOverlay = document.querySelector('.settingsOverlay')
const mediaSetting = document.querySelector('.settings')

mediaSettingToggleBtn.addEventListener('click', () => {
    mediaSetting.classList.add('active')
    mediaSettingOverlay.classList.add('active')
    cameraPageBody.classList.add('no-scroll')
})
mediaSettingCloseBtn.addEventListener('click', () => {
    mediaSetting.classList.remove('active')
    mediaSettingOverlay.classList.remove('active')
    cameraPageBody.classList.remove('no-scroll')
})