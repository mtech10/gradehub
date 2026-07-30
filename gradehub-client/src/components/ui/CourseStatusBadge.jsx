import Badge from "./Badge";

function CourseStatusBadge({ registered }) {
  return (
    <Badge variant={registered ? "success" : "secondary"}>
      {registered ? "Registered" : "Available"}
    </Badge>
  );
}

export default CourseStatusBadge;
