"""Connect the owner's real Formspree endpoint; no messages sent, no deployment."""
from pathlib import Path
import argparse,re
p=argparse.ArgumentParser();p.add_argument('endpoint');a=p.parse_args()
if not re.fullmatch(r'https://formspree\.io/f/[a-zA-Z0-9]+',a.endpoint):p.error('Expected the real https://formspree.io/f/... endpoint from your account.')
root=Path(__file__).resolve().parents[1];path=root/'index.html';s=path.read_text();s=re.sub(r'(<form class="beta-native-form" action=")[^"]+',lambda m:m[1]+a.endpoint,s)
s=re.sub(r'<input type="hidden" name="_(?:next|template|subject)"[^>]*>','',s)
path.write_text(s);print('Endpoint configured. No test submission or deployment performed.')
