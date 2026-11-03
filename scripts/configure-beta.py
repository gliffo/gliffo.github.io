"""Configure the real Tally access form. Does not publish or change feedback."""
from pathlib import Path
import argparse,re
ROOT=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('url',help='Public https://tally.so/r/... URL for the separate Beta form');a=p.parse_args()
m=re.fullmatch(r'https://tally\.so/r/([A-Za-z0-9]+)/*',a.url.strip())
if not m or m[1]=='jeZYO9':p.error('Use a new published Beta-access form, not the feedback form.')
fid=m[1];url='https://tally.so/r/'+fid
markup=f'''<div class="beta-embed"><a href="{url}" id="beta-direct">Il modulo non compare? Aprilo su Tally</a><iframe id="beta-form" data-form-id="{fid}" src="https://tally.so/embed/{fid}?alignLeft=1&amp;hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1" data-tally-src="https://tally.so/embed/{fid}?alignLeft=1&amp;hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1" loading="lazy" width="100%" height="320" frameborder="0" marginheight="0" marginwidth="0" title="Accedi alla Beta di Gliffo Suite"></iframe><noscript><p>Apri il modulo su Tally tramite il link qui sopra per lasciare la tua email.</p></noscript></div><script src="/beta-access.js?v=1" defer></script>'''
path=ROOT/'index.html';s=path.read_text();s=re.sub(r'(?s)(<!-- BETA_FORM_START -->).*?(<!-- BETA_FORM_END -->)',lambda m:m[1]+markup+m[2],s);path.write_text(s)
print('Configured Beta form '+fid+'. Tally form must require Email and have its completion destination configured to https://gliffo.github.io/beta/download/ for the standalone fallback. No deployment performed.')
