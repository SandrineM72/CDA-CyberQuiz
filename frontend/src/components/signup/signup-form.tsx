import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Créez votre compte</CardTitle>
        <CardDescription>
          Entrez vos informations pour créer votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                Nous utiliserons cet email pour vos contacter, nous ne le partagerons pas.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="pseudo">Pseudo</FieldLabel>
              <Input id="pseudo" type="text" placeholder="Tom Cruise" required />
            </Field>

            <Field>
              <FieldLabel htmlFor="age_range">Tranche d'âge</FieldLabel>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionnez votre tranche d'âge" />
                </SelectTrigger>
                
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tranche d'âge</SelectLabel>
                    <SelectItem value="touspublics">Moins de 12 ans</SelectItem>
                    <SelectItem value="moins_12">Plus de 12 ans</SelectItem>
                    <SelectItem value="moins_16">Plus de 16 ans</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Le mot de passe doit contenir un minimum de 8 caractères, dont une minuscule, une majuscule, un chiffre et un caractère spécial.
              </FieldDescription>
            </Field>

            {/* <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmer mot de passe
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field> */}

            <FieldGroup>
              <Field>
                <Button type="submit" variant="outline" className="cursor-pointer mb-4">Créer compte</Button>
                <FieldDescription className="px-6 text-center">
                  Avez-vous déjà un compte ? <a href="#">Connexion</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
            
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
