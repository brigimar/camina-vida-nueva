"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Circuito } from "@/types/circuito";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circuito: Circuito | null;
  onConfirm: () => void;
}

export default function DeleteCircuitoDialog({
  open,
  onOpenChange,
  circuito,
  onConfirm,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar circuito?</AlertDialogTitle>
        </AlertDialogHeader>

        <p className="text-sm text-muted-foreground">
          {circuito
            ? `Vas a eliminar/desactivar "${circuito.nombre}".`
            : "¿Confirmás la eliminación?"}
        </p>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
