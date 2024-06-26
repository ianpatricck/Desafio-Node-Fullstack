import { render, screen } from "@testing-library/react";
import PageBreadcrumb from "@/components/Common/Breadcrumb/PageBreadcrumb";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditEvent from "../EditEvent";

describe("testing EditEvent page", () => {

  it("should render the Event Presentation with breadcrumb", () => {

    const routes = [
      {
        page: "Home",
        path: "/",
        isLastItem: false
      },
      {
        page: "Eventos",
        path: "/events",
        isLastItem: true
      }
    ];

    render(<PageBreadcrumb items={routes} />);

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Eventos")).toBeInTheDocument()
  });

  it("should render the EditEvent form", () => {

    const client = new QueryClient();

    render(
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<EditEvent />}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.queryByText("Nome do evento*")).toBeInTheDocument();
    expect(screen.queryByText("Data do evento*")).toBeInTheDocument();
    expect(screen.queryByText("Selecione um tipo*")).toBeInTheDocument();
    expect(screen.queryByText("Horário do evento*")).toBeInTheDocument();
    expect(screen.queryByText("E-mail*")).toBeInTheDocument();
    expect(screen.queryByText("Telefone")).toBeInTheDocument();

    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });

});

