import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { states, type Address } from "../schema";
const responseSchema = z.object({
  logradouro: z.string(),
  bairro: z.string(),
  localidade: z.string().min(1),
  uf: z.enum(states),
});
export function useCep() {
  const { control, setValue } = useFormContext<Address>();
  const cep = useWatch({ control, name: "cep" }) ?? "";
  const [status, setStatus] = useState<{
    loading: boolean;
    message: string;
    error: boolean;
  }>({ loading: false, message: "", error: false });
  useEffect(() => {
    const digits = cep.replace(/\D/g, "");
    if (!/^\d{5}-?\d{3}$/.test(cep)) {
      setStatus({
        loading: false,
        message: cep.length >= 8 ? "Informe um CEP válido com 8 números." : "",
        error: cep.length >= 8,
      });
      return;
    }
    const controller = new AbortController();
    let active = true;
    let timedOut = false;
    setStatus({
      loading: true,
      message: "Buscando endereço pelo CEP…",
      error: false,
    });
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 8000);
    const delay = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${digits}/json/`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Falha na consulta");
        const raw: unknown = await response.json();
        if (!active) return;
        if (
          typeof raw === "object" &&
          raw !== null &&
          "erro" in raw &&
          raw.erro
        ) {
          setStatus({
            loading: false,
            message:
              "CEP não encontrado. Confira o CEP ou preencha o endereço manualmente.",
            error: true,
          });
          return;
        }
        const parsed = responseSchema.safeParse(raw);
        if (!parsed.success) throw new Error("Resposta inválida");
        const data = parsed.data;
        setValue("street", data.logradouro, { shouldValidate: true });
        setValue("district", data.bairro, { shouldValidate: true });
        setValue("city", data.localidade, { shouldValidate: true });
        setValue("state", data.uf, { shouldValidate: true });
        setStatus({
          loading: false,
          message:
            data.logradouro && data.bairro
              ? "Endereço encontrado. Confira os dados e informe o número."
              : "CEP encontrado. Complete a rua, o bairro e o número.",
          error: false,
        });
      } catch {
        if (active)
          setStatus({
            loading: false,
            message: timedOut
              ? "A consulta demorou demais. Preencha o endereço manualmente."
              : "Não foi possível consultar o CEP. Preencha o endereço manualmente.",
            error: true,
          });
      } finally {
        clearTimeout(timeout);
      }
    }, 350);
    return () => {
      active = false;
      clearTimeout(delay);
      clearTimeout(timeout);
      controller.abort();
    };
  }, [cep, setValue]);
  return status;
}
