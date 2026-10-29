function youtubeEmbed(url) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : url;
}

export default function VideoPlayer({ video }) {
  const isYoutube = video.type === 'youtube' || /youtu\.?be/.test(video.url);
  return (
    <figure className="video">
      <div className="video__frame">
        {isYoutube ? (
          <iframe
            src={youtubeEmbed(video.url)}
            title={video.title || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={video.url} controls preload="metadata" poster={video.poster} />
        )}
      </div>
      {video.title && <figcaption>{video.title}</figcaption>}
    </figure>
  );
}
