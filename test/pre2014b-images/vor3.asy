if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="vor3";
if(settings.render < 0) settings.render=4;
settings.outformat="";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

import cseblack;
import olympiad;
usepackage("amssymb");
size(450);

pointfontsize = 20;
pathfontsize = 24;

real c = 2.;
real rr = 1.4;
real cc = 1.9;
real x1 = 1.5;
real x2 = -1.4;
real tb = 0.6*pi;
real xc = 1.1;
real tc = -0.3*pi;
real td = -0.8*pi;
real te = 0.74*pi;
pair ra = (0,0);
pair rb = (c*(1+cos(tb)),c*sin(tb));
pair rc = (c*xc*(1+cos(tc)),c*xc*sin(tc));
pair rd = (c*cos(td),c*sin(td));
pair re = (1.05*c*cos(te),1.05*c*sin(te));
path Lb = (rb/2.+(rb.y,-rb.x))--(rb/2.-(rb.y,-rb.x));
path Lc = (rc/2.+0.6*(rc.y,-rc.x))--(rc/2.-0.5*(rc.y,-rc.x));
path Ld = (rd/2.+(rd.y,-rd.x))--(rd/2.-1.4*(rd.y,-rd.x));
path Le = (re/2.+(re.y,-re.x))--(re/2.-(re.y,-re.x));


path pa = circle(ra,1);
path pb = circle(rb,1);
path pc = circle(rc,1);
path pd = circle(rd,1);
path pe = circle(re,1);
path oa = circle((cc,0),cc);
path pr = circle((0,0),rr);

fill(oa,lightgray);
fill(IP(Lb,Le)--IP(Le,Ld)--IP(Ld,Lc)--IP(Lc,Lb)--cycle,gray(0.7));
//D(pb,linewidth(1)); fill(pb,gray);
//D(pc,linewidth(1)); fill(pc,gray);
//D(pd,linewidth(1)); fill(pd,gray);
//D(pe,linewidth(1)); fill(pe,gray);
//D(pa,linewidth(1)); fill(pa,gray);
MC("S",D(pr,dotted),0.4,NW);
D(oa,dashed); 
MP("A",D((cc,0)),NE);
MP("O",D((0,0)),NW);
//D((c*(1+cos(tb)),c*sin(tb))); D((c*xc*(1+cos(tc)),c*xc*sin(tc)));
MC("c",D((0,0)--(cc,0)),0.3,N);
label("$\Omega(c)$",(1.2*c,-0.4*c),fontsize(24)+pointfontpen);
//D((c*(1+x1*cos(pi/2.+tb/2.)),c*x1*sin(pi/2.+tb/2.))--(c*(1+x2*cos(pi/2.+tb/2.)),c*x2*sin(pi/2.+tb/2.)),dotted);

D(ra);D(rb);D(rc);D(rd);D(re);
real alpha=69.51268489;
D(CR((0,0),rr,-alpha,+alpha),linewidth(2));


viewportsize=(360.0pt,0);
