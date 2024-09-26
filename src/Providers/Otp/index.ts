import { authenticator } from "otplib";


function loadOptions() {
  authenticator.resetOptions();
  authenticator.options = {
    ...authenticator.options,
    digits: 6,
    step: 30,
    window: 0,
    epoch: Date.now(),
    algorithm:'sha256' as any
    
  };
}

class OTPLibProvider {
  generateKeyURI(accountName: string, issuer: string, secret: string): string {
    return authenticator.keyuri(accountName, issuer, secret);
  }

  verifyToken(token: string, secret: string): boolean {
    loadOptions();
    return authenticator.verify({ token, secret });
  }

  generateToken(secret: string): string {
    loadOptions();
    const token = authenticator.generate(secret);

    return token;
  }

  generateBase32Key(): string {
    loadOptions();
    const secretLength = 64;
    return authenticator.generateSecret(secretLength);
  }
}

export { OTPLibProvider };