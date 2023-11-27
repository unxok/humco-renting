export const Bath = ({
  fill,
  w,
  h,
}: {
  fill: string;
  w: number | string;
  h: number | string;
}) => (
  <svg
    fill={fill}
    viewBox="0 0 24 24"
    width={w}
    height={h}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      //   strokLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M21,12H6V6A2,2,0,0,1,8,4h2a2,2,0,0,1,1.855,1.261A3.347,3.347,0,0,0,10,8.3v.656A1.022,1.022,0,0,0,11,10h4a1.022,1.022,0,0,0,1-1.042V8.125a3.1,3.1,0,0,0-2.093-2.966A4,4,0,0,0,10,2H8A4,4,0,0,0,4,6v6H3a1,1,0,0,0,0,2H4v3a2,2,0,0,0,2,2v2a1,1,0,0,0,2,0V19h8v2a1,1,0,0,0,2,0V19a2,2,0,0,0,2-2V14h1a1,1,0,0,0,0-2Z"></path>
    </g>
  </svg>
);
