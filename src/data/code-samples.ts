export interface CodeSample {
  file: string;
  language: "java" | "tsx" | "sql";
  code: string;
}

export const codeSamples: CodeSample[] = [
  {
    file: "DeveloperController.java",
    language: "java",
    code: `@RestController
@RequestMapping("/api")
public class DeveloperController {

    @GetMapping("/profile")
    public Developer getProfile() {
        return new Developer(
            "Orl Tokata",
            "Full-Stack Engineer"
        );
    }
}`,
  },
  {
    file: "profile-card.tsx",
    language: "tsx",
    code: `export default async function Profile() {
  const dev = await getProfile();

  return (
    <Card>
      <h1>{dev.name}</h1>
      <Stack items={dev.stack} />
    </Card>
  );
}`,
  },
  {
    file: "V1__create_contact.sql",
    language: "sql",
    code: `CREATE TABLE contact_message (
  id         BIGINT GENERATED ALWAYS AS IDENTITY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(254) NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);`,
  },
];
