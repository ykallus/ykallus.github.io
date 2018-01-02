if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="vor2";
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

path pa = circle(ra,1);
path pb = circle(rb,1);
path pc = circle(rc,1);
path pd = circle(rd,1);
path pe = circle(re,1);
path oa = circle((c,0),c);

//fill(oa,lightgray);
D(pb,linewidth(1)); fill(pb,gray);
D(pc,linewidth(1)); fill(pc,gray);
D(pd,linewidth(1)); fill(pd,gray);
D(pe,linewidth(1)); fill(pe,gray);
//D(oa,dashed); 
//MC("A",D((c,0)),NE);
//MC("O",D((0,0)),NW);
//D((c*(1+cos(tb)),c*sin(tb))); D((c*xc*(1+cos(tc)),c*xc*sin(tc)));
//MC("c",D((0,0)--(c,0)),0.6,N);
//label("$\Omega(c)$",(1.2*c,-0.4*c));
//D((c*(1+x1*cos(pi/2.+tb/2.)),c*x1*sin(pi/2.+tb/2.))--(c*(1+x2*cos(pi/2.+tb/2.)),c*x2*sin(pi/2.+tb/2.)),dotted);

path Lb = D((rb/2.+(rb.y,-rb.x))--(rb/2.-(rb.y,-rb.x)),dashed);
path Lc = D((rc/2.+0.6*(rc.y,-rc.x))--(rc/2.-0.5*(rc.y,-rc.x)),dashed);
path Ld = D((rd/2.+(rd.y,-rd.x))--(rd/2.-1.4*(rd.y,-rd.x)),dashed);
path Le = D((re/2.+(re.y,-re.x))--(re/2.-(re.y,-re.x)),dashed);

fill(IP(Lb,Le)--IP(Le,Ld)--IP(Ld,Lc)--IP(Lc,Lb)--cycle,gray(0.7));
D(pa,linewidth(1)); fill(pa,gray);
D(ra);D(rb);D(rc);D(rd);D(re);


viewportsize=(360.0pt,0);
