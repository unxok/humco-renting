export const Bed = ({
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
    width={w}
    height={h}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M20,12V4a1,1,0,0,0-2,0V6H6V4A1,1,0,0,0,4,4v8a2,2,0,0,0-2,2v6a1,1,0,0,0,2,0V18H20v2a1,1,0,0,0,2,0V14A2,2,0,0,0,20,12Zm-6-2h3a1,1,0,0,1,1,1v1H13V11A1,1,0,0,1,14,10ZM6,11a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1v1H6Z"></path>
    </g>
  </svg>
);
