import { render, screen } from "@testing-library/react";
import PageBreadcrumb from "@/components/Common/Breadcrumb/PageBreadcrumb";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditPlace from "../EditPlace";

describe("testing EditPlace page", () => {

  it("should render the Place Presentation with breadcrumb", () => {

    const routes = [
      {
        page: "Home",
        path: "/",
        isLastItem: false
      },
      {
        page: "Locais",
        path: "/places",
        isLastItem: true
      }
    ];

    render(<PageBreadcrumb items={routes} />);

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Locais")).toBeInTheDocument()
  });

  it("should render the EditPlace form", () => {

    const client = new QueryClient();

    render(
      <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<EditPlace />}/>
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.queryByText("Nome do local*")).toBeInTheDocument();
    expect(screen.queryByText("Selecione um tipo*")).toBeInTheDocument();
    expect(screen.queryByText("Apelido")).toBeInTheDocument();
    expect(screen.queryByText("CNPJ*")).toBeInTheDocument();
    expect(screen.queryByText("Cidade*")).toBeInTheDocument();
    expect(screen.queryByText("CEP*")).toBeInTheDocument();
    expect(screen.queryByText("Complemento")).toBeInTheDocument();
    expect(screen.queryByText("Estado*")).toBeInTheDocument();
    expect(screen.queryByText("Endereço*")).toBeInTheDocument();
    expect(screen.queryByText("E-mail*")).toBeInTheDocument();
    expect(screen.queryByText("Telefone")).toBeInTheDocument();
    
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });

});

