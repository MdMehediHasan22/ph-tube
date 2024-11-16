const loadVideo = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
    const data = await res.json();
    const videos = data.data;
    displayVideos(videos);
}

const displayVideos = (videos) =>{
    const videosContainer = document.getElementById('videos-container');
    videos.forEach(video=>{
        console.log(video);
        const videoCard = document.createElement('div');
        videoCard.classList = 'bg-base-100 w-full md:w-64 p-4 lg:w-full';
        videoCard.innerHTML=`
   <figure>
        <img class="w-full md:80 lg:w-full h-48 md:h-36 lg:h-48 rounded-lg"
             src="${video.thumbnail}"
                        alt="Videos" />
    </figure>
    <div class="mt-4 flex items-start space-x-2 ">
                    <!-- Author Image -->
        <div >
            <img class="w-10 h-9 md:w-12 md:h-10 lg:w-16 lg:h-12  rounded-full object-cover" src="${video?.authors[0]?.profile_picture}" alt="">

        </div>
                      
                    <!-- Title and Author Information -->
        <div class="w-full">
            <h2 class="text-lg font-semibold">${video.title}</h2>
            <div class="flex items-center space-x-1">
                <span class="text-sm font-medium">${video.authors[0].profile_name}</span>
                ${video.authors[0].verified ? `<span class="text-blue-500">✔️</span>` : ""}
            </div>
            <div class="text-sm text-gray-500 mt-1">
                 ${video?.others?.views} ${'views'}
            </div>
        </div>
    </div>
                      
        `;
        videosContainer.appendChild(videoCard);
    });
}
loadVideo();