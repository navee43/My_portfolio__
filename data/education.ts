export type Education = {
  id: string;
  institution: string;
  qualification: string;
  place: string;
  period: string;
  /** For <time> elements. */
  startISO?: string;
  endISO: string;
  status?: string;
  details?: { label: string; text: string }[];
};

/**
 * From the resume. Note: the brief listed the B.Tech period as "2026–Present",
 * but the resume says 2023–2027, which matches Class XII in 2022.
 * The resume is used here. Change `period` if that's wrong.
 */
export const education: Education[] = [
  {
    id: "iiit-una",
    institution: "Indian Institute of Information Technology Una",
    qualification: "B.Tech in Information Technology",
    place: "Una, Himachal Pradesh",
    period: "2023 – 2027",
    startISO: "2023",
    endISO: "2027",
    status: "In progress",
    details: [
      {
        label: "Core coursework",
        text: "Data Structures and Algorithms, Object-Oriented Programming, Operating Systems, Computer Networks, Database Management Systems, Computer Organization, Discrete Mathematics and System Design.",
      },
      {
        label: "Beyond class",
        text: "Captain of the institute football team, and a technical member of the student team that builds and maintains the IIIT Una website.",
      },
    ],
  },
  {
    id: "rps",
    institution: "RPS Mahendergarh",
    qualification: "Senior Secondary (Class XII), CBSE",
    place: "Mahendergarh, Haryana",
    period: "2022",
    endISO: "2022",
  },
];
