
export default function Map() {


  return (<div id="Map" className="h-dvh">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.806607301791!2d36.82046107364709!3d-1.2903244356277823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d8fadeb4d7%3A0x2bc0bc06cdf83369!2sCBK%20Pension%20Tower!5e0!3m2!1sen!2ske!4v1719065060522!5m2!1sen!2ske"
      width="600"
      height="450"
      style={{ border: 0 }}
      loading="lazy"
      title="Google Map"
      className="w-full h-full"
    ></iframe>
  </div>);
}