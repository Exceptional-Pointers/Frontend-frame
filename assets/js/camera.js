const video = document.querySelector('video');
const mediaToggle = document.querySelectorAll('.stream__media-control');
// const switchVideoLabel = document.querySelector('.stream__mediaControl-video label');
// const switchVideoToggle = document.querySelector('.stream__mediaControl-video span');

mediaToggle.forEach((media) => {
    const mediaLabel = media.querySelector('label')
    mediaLabel.addEventListener('click', function () {
        media.querySelector('span').classList.toggle('active');
        if (mediaLabel.getAttribute('for') == 'video-toggle') {
            stream.getTracks().forEach(function (track) {
                if (track.readyState == 'live' && track.kind === 'video') {
                    track.enabled = false;
                    console.log('stoped', track.readyState);
                } else if (track.readyState == 'ended' && track.kind === 'video') {
                    track.readyState = 'live'
                    console.log('sytart', track.readyState, track);
                    track.enabled = true;
                }
            });
        }

    })
})


navigator.mediaDevices.getUserMedia({
    video: true
}).then((stream) => {
    video.srcObject = stream;
})