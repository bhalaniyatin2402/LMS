function Video({ src }) {
  return (
    <video
      src={src}
      className="w-full h-auto md:h-[250px] border rounded-md"
      controls
      disablePictureInPicture
      muted
      controlsList="nodownload"
    ></video>
  );
}

export default Video;
