import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

interface ProfileModifyFormProps {
  currentPseudo: string;
  currentAvatarUrl?: string;
  onUpdateAvatar?: (newAvatarUrl: string, currentPassword: string) => Promise<void>;
  onUpdatePseudo?: (newPseudo: string, currentPassword: string) => Promise<void>;
  onUpdatePassword?: (newPassword: string, currentPassword: string) => Promise<void>;
}

export default function ProfileModifyForm({
  currentPseudo,
  currentAvatarUrl,
  onUpdateAvatar,
  onUpdatePseudo,
  onUpdatePassword,
}: ProfileModifyFormProps) {
  // Section expansion states
  const [avatarExpanded, setAvatarExpanded] = useState(false);
  const [pseudoExpanded, setPseudoExpanded] = useState(false);
  const [passwordExpanded, setPasswordExpanded] = useState(false);

  // Avatar form state
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [avatarPassword, setAvatarPassword] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  // Pseudo form state
  const [newPseudo, setNewPseudo] = useState("");
  const [pseudoPassword, setPseudoPassword] = useState("");
  const [pseudoLoading, setPseudoLoading] = useState(false);
  const [pseudoError, setPseudoError] = useState<string | null>(null);

  // Password form state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  // Avatar handlers
  const handleAvatarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAvatarError(null);
    setAvatarLoading(true);

    try {
      if (!newAvatarUrl.trim()) {
        setAvatarError("Veuillez saisir une URL d'avatar");
        return;
      }
      if (!avatarPassword) {
        setAvatarError("Mot de passe requis");
        return;
      }

      await onUpdateAvatar?.(newAvatarUrl, avatarPassword);
      
      // Reset form on success
      setNewAvatarUrl("");
      setAvatarPassword("");
      setAvatarExpanded(false);
    } catch (err: any) {
      setAvatarError(err.message || "Erreur lors de la mise à jour de l'avatar");
    } finally {
      setAvatarLoading(false);
    }
  };

  // Pseudo handlers
  const handlePseudoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPseudoError(null);
    setPseudoLoading(true);

    try {
      if (!newPseudo.trim()) {
        setPseudoError("Veuillez saisir un nouveau pseudo");
        return;
      }
      if (!pseudoPassword) {
        setPseudoError("Mot de passe requis");
        return;
      }

      await onUpdatePseudo?.(newPseudo, pseudoPassword);
      
      // Reset form on success
      setNewPseudo("");
      setPseudoPassword("");
      setPseudoExpanded(false);
    } catch (err: any) {
      setPseudoError(err.message || "Erreur lors de la mise à jour du pseudo");
    } finally {
      setPseudoLoading(false);
    }
  };

  // Password handlers
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordLoading(true);

    try {
      if (!newPassword) {
        setPasswordError("Veuillez saisir un nouveau mot de passe");
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError("Les mots de passe ne correspondent pas");
        return;
      }
      if (!currentPassword) {
        setPasswordError("Mot de passe actuel requis");
        return;
      }

      await onUpdatePassword?.(newPassword, currentPassword);
      
      // Reset form on success
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
      setPasswordExpanded(false);
    } catch (err: any) {
      setPasswordError(err.message || "Erreur lors de la mise à jour du mot de passe");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="flex w-full items-start justify-center px-6 pt-2 pb-8 md:px-10">
      <div className="w-full max-w-md space-y-4">
        {/* Avatar Section */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-[200px] w-[200px] border-4 border-[#00bb0d] bg-black">
              <AvatarImage src={currentAvatarUrl || newAvatarUrl} alt="Avatar" />
              <AvatarFallback className="bg-black text-white text-base font-semibold text-center px-4">
                Télécharger<br />nouvel<br />avatar
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Modify Avatar Card */}
        <Card className="bg-black border-2 border-[#00bb0d] rounded-none">
          <CardHeader 
            className="cursor-pointer hover:bg-[#00bb0d] hover:bg-opacity-10 transition-colors p-4"
            onClick={() => setAvatarExpanded(!avatarExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-[#00bb0d]" />
                <h3 className="text-white text-lg font-semibold">Modifier l'avatar</h3>
              </div>
              {avatarExpanded ? (
                <ChevronUp className="w-5 h-5 text-[#00bb0d]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#00bb0d]" />
              )}
            </div>
          </CardHeader>
          
          {avatarExpanded && (
            <CardContent className="px-4 pb-4">
              <form onSubmit={handleAvatarSubmit}>
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel htmlFor="newAvatar" className="text-white text-base mb-2">
                      URL du nouvel avatar
                    </FieldLabel>
                    <Input
                      id="newAvatar"
                      type="url"
                      placeholder="https://exemple.com/avatar.jpg"
                      value={newAvatarUrl}
                      onChange={(e) => setNewAvatarUrl(e.target.value)}
                      className="bg-[#565656] border-[#00bb0d] border-2 text-white placeholder:text-[#a5a5a5] rounded-none h-12"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="avatarPassword" className="text-white text-base mb-2">
                      Mot de passe actuel
                    </FieldLabel>
                    <Input
                      id="avatarPassword"
                      type="password"
                      placeholder="••••••••"
                      value={avatarPassword}
                      onChange={(e) => setAvatarPassword(e.target.value)}
                      className="bg-[#565656] border-[#00bb0d] border-2 text-white rounded-none h-12"
                    />
                  </Field>

                  {avatarError && (
                    <p className="text-sm text-[#c00f00] text-center">{avatarError}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={avatarLoading}
                    className="w-full bg-[#00bb0d] text-black border-4 border-[#00bb0d] hover:bg-transparent hover:text-[#00bb0d] rounded-full h-12 text-base font-semibold"
                  >
                    {avatarLoading ? "Validation..." : "Valider l'avatar"}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          )}
        </Card>

        {/* Modify Pseudo Card */}
        <Card className="bg-black border-2 border-[#00bb0d] rounded-none">
          <CardHeader 
            className="cursor-pointer hover:bg-[#00bb0d] hover:bg-opacity-10 transition-colors p-4"
            onClick={() => setPseudoExpanded(!pseudoExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-[#00bb0d]" />
                <h3 className="text-white text-lg font-semibold">Modifier le pseudo</h3>
              </div>
              {pseudoExpanded ? (
                <ChevronUp className="w-5 h-5 text-[#00bb0d]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#00bb0d]" />
              )}
            </div>
          </CardHeader>
          
          {pseudoExpanded && (
            <CardContent className="px-4 pb-4">
              <p className="text-[#565656] text-sm mb-4">Pseudo actuel : <span className="text-white">{currentPseudo}</span></p>
              <form onSubmit={handlePseudoSubmit}>
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel htmlFor="newPseudo" className="text-white text-base mb-2">
                      Nouveau pseudo
                    </FieldLabel>
                    <Input
                      id="newPseudo"
                      type="text"
                      placeholder="Nouveau pseudo"
                      value={newPseudo}
                      onChange={(e) => setNewPseudo(e.target.value)}
                      className="bg-[#565656] border-[#00bb0d] border-2 text-white placeholder:text-[#a5a5a5] rounded-none h-12"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="pseudoPassword" className="text-white text-base mb-2">
                      Mot de passe actuel
                    </FieldLabel>
                    <Input
                      id="pseudoPassword"
                      type="password"
                      placeholder="••••••••"
                      value={pseudoPassword}
                      onChange={(e) => setPseudoPassword(e.target.value)}
                      className="bg-[#565656] border-[#00bb0d] border-2 text-white rounded-none h-12"
                    />
                  </Field>

                  {pseudoError && (
                    <p className="text-sm text-[#c00f00] text-center">{pseudoError}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={pseudoLoading}
                    className="w-full bg-[#00bb0d] text-black border-4 border-[#00bb0d] hover:bg-transparent hover:text-[#00bb0d] rounded-full h-12 text-base font-semibold"
                  >
                    {pseudoLoading ? "Validation..." : "Valider le pseudo"}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          )}
        </Card>

        {/* Modify Password Card */}
        <Card className="bg-black border-2 border-[#00bb0d] rounded-none">
          <CardHeader 
            className="cursor-pointer hover:bg-[#00bb0d] hover:bg-opacity-10 transition-colors p-4"
            onClick={() => setPasswordExpanded(!passwordExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-[#00bb0d]" />
                <h3 className="text-white text-lg font-semibold">Modifier le mot de passe</h3>
              </div>
              {passwordExpanded ? (
                <ChevronUp className="w-5 h-5 text-[#00bb0d]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#00bb0d]" />
              )}
            </div>
          </CardHeader>
          
          {passwordExpanded && (
            <CardContent className="px-4 pb-4">
              <form onSubmit={handlePasswordSubmit}>
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel htmlFor="newPassword" className="text-white text-base mb-2">
                      Nouveau mot de passe
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Nouveau mot de passe"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-[#565656] border-[#00bb0d] border-2 text-white rounded-none h-12 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a5a5a5] hover:text-white"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirmPassword" className="text-white text-base mb-2">
                      Confirmation mot de passe
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirmation"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-[#565656] border-[#00bb0d] border-2 text-white rounded-none h-12 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a5a5a5] hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="currentPasswordForPwd" className="text-white text-base mb-2">
                      Mot de passe actuel
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="currentPasswordForPwd"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-[#565656] border-[#00bb0d] border-2 text-white rounded-none h-12 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a5a5a5] hover:text-white"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </Field>

                  {passwordError && (
                    <p className="text-sm text-[#c00f00] text-center">{passwordError}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full bg-[#00bb0d] text-black border-4 border-[#00bb0d] hover:bg-transparent hover:text-[#00bb0d] rounded-full h-12 text-base font-semibold"
                  >
                    {passwordLoading ? "Validation..." : "Valider le mot de passe"}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
