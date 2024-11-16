const loadCategories = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories =  data.data
    displayCategoryButtons(categories);
    loadVideosByCategory('all');
}

const displayCategoryButtons = (categories) =>{
    const categoryButtonsContainer = document.getElementById('category-buttons');
    categoryButtonsContainer.innerHTML = '';//clear any previous buttons


    // Create category buttons dynamically
    categories.forEach(categoryName =>{
        const button = document.createElement('button');
        button.classList = 'bg-red-500 py-2 px-4 flex justify-center text-white text-center rounded';
        button.innerText = categoryName.category;
        button.addEventListener('click',() =>loadVideosByCategory(categoryName.category_id));
        categoryButtonsContainer.appendChild(button);

    });
}
const loadVideosByCategory = async(categoryId)=>{
  const url = categoryId==='all'
  ?`https://openapi.programming-hero.com/api/videos/category/1000`
  :`https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
  const res = await fetch(url);
  const data = await res.json();
  const videos = data.data;
  if(videos.length === 0){
    displayNotFound();
  }
  else{
    displayVideos(videos);
  }
}
const shortView = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const data = await res.json();
    const videos = data.data;

    // Sort the videos by views in descending order
    const sortedVideos = videos.sort((a, b) => b.others.views - a.others.views);

    // Display the sorted videos
    displayVideos(sortedVideos);
};

const displayVideos = (videos) =>{
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = ''; // Clear previous videos

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
const displayNotFound = () => {
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = `
    <div class="flex text-center justify-center items-center text-xl font-semibold text-red-500">
    <img src="\Icon.png">
    OOPS Sorry!There is no content here!</div>
    `;
}
const shortViewButton = document.getElementById('short-view');
shortViewButton.addEventListener('click', shortView);

loadCategories();



