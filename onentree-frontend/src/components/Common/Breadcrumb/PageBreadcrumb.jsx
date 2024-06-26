import { Breadcrumbs, Link } from "@mui/material";

export default function PageBreadcrumb({ items }) {
  return (
    <div role="pages">
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 20, color: "white" }} >
        {items.map((item, key) => {
          if (item.isLastItem) {
            return (
              <Link key={key} sx={{ color: "var(--support-blue)", textDecoration: 0 }} href={item.path}>
                {item.page}
              </Link>
            )
          } else {
            return (
              <Link key={key} sx={{ color: "var(--primary)", textDecoration: 0 }} href={item.path}>
                {item.page}
              </Link>
            )
          }
        })}
      </Breadcrumbs>
    </div>
  );
}

