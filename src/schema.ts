��e x p o r t   t y p e   J s o n   =  
     |   s t r i n g  
     |   n u m b e r  
     |   b o o l e a n  
     |   n u l l  
     |   {   [ k e y :   s t r i n g ] :   J s o n   }  
     |   J s o n [ ]  
  
 e x p o r t   i n t e r f a c e   D a t a b a s e   {  
     p u b l i c :   {  
         T a b l e s :   {  
             a l l i e s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e :   s t r i n g  
                     i s _ e v i l _ a l l y :   b o o l e a n  
                     a b i l i t y _ n a m e s :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s :   s t r i n g [ ]  
                 }  
                 I n s e r t :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e :   s t r i n g  
                     i s _ e v i l _ a l l y ? :   b o o l e a n  
                     a b i l i t y _ n a m e s :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s :   s t r i n g [ ]  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     t h e m e ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e ? :   s t r i n g  
                     i s _ e v i l _ a l l y ? :   b o o l e a n  
                     a b i l i t y _ n a m e s ? :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s ? :   s t r i n g [ ]  
                 }  
             }  
             c o m p _ v i l l a i n s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     v i l l a i n _ i d :   n u m b e r  
                     o r i g i n a l _ i m a g e :   s t r i n g   |   n u l l  
                     t r a i t _ k e y w o r d s :   s t r i n g [ ]  
                     a b i l i t y _ n a m e s :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s :   s t r i n g [ ]  
                     m o v e _ a t t r i b u t e :   n u m b e r  
                     a t t a c k _ a t t r i b u t e :   n u m b e r  
                     d e f e n d _ a t t r i b u t e :   n u m b e r  
                     l i f e _ a t t r i b u t e :   n u m b e r  
                     a w a k e n i n g _ a t t r i b u t e :   n u m b e r  
                 }  
                 I n s e r t :   {  
                     i d ? :   n u m b e r  
                     v i l l a i n _ i d :   n u m b e r  
                     o r i g i n a l _ i m a g e ? :   s t r i n g   |   n u l l  
                     t r a i t _ k e y w o r d s :   s t r i n g [ ]  
                     a b i l i t y _ n a m e s :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s :   s t r i n g [ ]  
                     m o v e _ a t t r i b u t e :   n u m b e r  
                     a t t a c k _ a t t r i b u t e :   n u m b e r  
                     d e f e n d _ a t t r i b u t e :   n u m b e r  
                     l i f e _ a t t r i b u t e :   n u m b e r  
                     a w a k e n i n g _ a t t r i b u t e :   n u m b e r  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     v i l l a i n _ i d ? :   n u m b e r  
                     o r i g i n a l _ i m a g e ? :   s t r i n g   |   n u l l  
                     t r a i t _ k e y w o r d s ? :   s t r i n g [ ]  
                     a b i l i t y _ n a m e s ? :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s ? :   s t r i n g [ ]  
                     m o v e _ a t t r i b u t e ? :   n u m b e r  
                     a t t a c k _ a t t r i b u t e ? :   n u m b e r  
                     d e f e n d _ a t t r i b u t e ? :   n u m b e r  
                     l i f e _ a t t r i b u t e ? :   n u m b e r  
                     a w a k e n i n g _ a t t r i b u t e ? :   n u m b e r  
                 }  
             }  
             c o o p _ v i l l a i n s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     v i l l a i n _ i d :   n u m b e r  
                     o r i g i n a l _ i m a g e :   s t r i n g   |   n u l l  
                     t r a i t _ k e y w o r d s :   s t r i n g [ ]  
                     a b i l i t y _ n a m e s :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s :   s t r i n g [ ]  
                     m o v e _ a t t r i b u t e :   n u m b e r  
                     a t t a c k _ a t t r i b u t e :   n u m b e r  
                     d e f e n d _ a t t r i b u t e :   n u m b e r  
                     l i f e _ a t t r i b u t e :   n u m b e r  
                     t a r g e t _ p r i o r i t y :   n u m b e r  
                     t a r g e t _ h i g h e s t :   b o o l e a n  
                 }  
                 I n s e r t :   {  
                     i d ? :   n u m b e r  
                     v i l l a i n _ i d :   n u m b e r  
                     o r i g i n a l _ i m a g e ? :   s t r i n g   |   n u l l  
                     t r a i t _ k e y w o r d s :   s t r i n g [ ]  
                     a b i l i t y _ n a m e s :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s :   s t r i n g [ ]  
                     m o v e _ a t t r i b u t e :   n u m b e r  
                     a t t a c k _ a t t r i b u t e :   n u m b e r  
                     d e f e n d _ a t t r i b u t e :   n u m b e r  
                     l i f e _ a t t r i b u t e :   n u m b e r  
                     t a r g e t _ p r i o r i t y :   n u m b e r  
                     t a r g e t _ h i g h e s t ? :   b o o l e a n  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     v i l l a i n _ i d ? :   n u m b e r  
                     o r i g i n a l _ i m a g e ? :   s t r i n g   |   n u l l  
                     t r a i t _ k e y w o r d s ? :   s t r i n g [ ]  
                     a b i l i t y _ n a m e s ? :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s ? :   s t r i n g [ ]  
                     m o v e _ a t t r i b u t e ? :   n u m b e r  
                     a t t a c k _ a t t r i b u t e ? :   n u m b e r  
                     d e f e n d _ a t t r i b u t e ? :   n u m b e r  
                     l i f e _ a t t r i b u t e ? :   n u m b e r  
                     t a r g e t _ p r i o r i t y ? :   n u m b e r  
                     t a r g e t _ h i g h e s t ? :   b o o l e a n  
                 }  
             }  
             e v e n t _ c a r d s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     d e c k _ i d :   n u m b e r  
                     i m a g e :   s t r i n g  
                     e f f e c t :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     d e c k _ i d :   n u m b e r  
                     i m a g e :   s t r i n g  
                     e f f e c t :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     t h e m e ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     d e c k _ i d ? :   n u m b e r  
                     i m a g e ? :   s t r i n g  
                     e f f e c t ? :   s t r i n g  
                 }  
             }  
             e v e n t _ d e c k s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e :   s t r i n g   |   n u l l  
                     c o l o r :   s t r i n g   |   n u l l  
                 }  
                 I n s e r t :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e ? :   s t r i n g   |   n u l l  
                     c o l o r ? :   s t r i n g   |   n u l l  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     t h e m e ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e ? :   s t r i n g   |   n u l l  
                     c o l o r ? :   s t r i n g   |   n u l l  
                 }  
             }  
             g a d g e t s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e :   s t r i n g  
                     a b i l i t y _ n a m e :   s t r i n g  
                     a b i l i t y _ e f f e c t :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e :   s t r i n g  
                     a b i l i t y _ n a m e :   s t r i n g  
                     a b i l i t y _ e f f e c t :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     t h e m e ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e ? :   s t r i n g  
                     a b i l i t y _ n a m e ? :   s t r i n g  
                     a b i l i t y _ e f f e c t ? :   s t r i n g  
                 }  
             }  
             h e r o e s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     t o k e n _ i d :   n u m b e r   |   n u l l  
                     s h e e t _ b a c k g r o u n d _ c o l o r :   s t r i n g  
                     d i c e _ i c o n _ c o l o r :   s t r i n g  
                     d i c e _ b a c k g r o u n d _ c o l o r :   s t r i n g  
                     t r a i t _ k e y w o r d s :   s t r i n g  
                     a b i l i t y _ n a m e s :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s :   s t r i n g [ ]  
                     i c o n _ i m a g e :   s t r i n g   |   n u l l  
                     h e r o _ i m a g e :   s t r i n g  
                     h e r o _ i m a g e _ s c a l e :   n u m b e r  
                     h e r o _ i m a g e _ p o s i t i o n _ l e f t :   n u m b e r  
                     h e r o _ i m a g e _ p o s i t i o n _ t o p :   n u m b e r  
                     m o v e _ a t t r i b u t e :   n u m b e r  
                     a t t a c k _ a t t r i b u t e :   n u m b e r  
                     d e f e n d _ a t t r i b u t e :   n u m b e r  
                     s k i l l _ a t t r i b u t e :   n u m b e r  
                     f o c u s _ a t t r i b u t e :   n u m b e r  
                     l i f e _ a t t r i b u t e :   n u m b e r  
                     a w a k e n i n g _ a t t r i b u t e :   n u m b e r  
                     a c t i o n _ d i c e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " d i c e _ i c o n s " ] [ ]  
                     i s _ s u p p o r t _ f i g u r e :   b o o l e a n  
                     n a m e _ f o n t _ s i z e :   n u m b e r   |   n u l l  
                     k e y w o r d s _ f o n t _ s i z e :   n u m b e r   |   n u l l  
                     a b i l i t y _ n a m e _ f o n t _ s i z e :   n u m b e r   |   n u l l  
                     a b i l i t y _ e f f e c t _ f o n t _ s i z e :   n u m b e r   |   n u l l  
                 }  
                 I n s e r t :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     t o k e n _ i d ? :   n u m b e r   |   n u l l  
                     s h e e t _ b a c k g r o u n d _ c o l o r :   s t r i n g  
                     d i c e _ i c o n _ c o l o r :   s t r i n g  
                     d i c e _ b a c k g r o u n d _ c o l o r :   s t r i n g  
                     t r a i t _ k e y w o r d s :   s t r i n g  
                     a b i l i t y _ n a m e s :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s :   s t r i n g [ ]  
                     i c o n _ i m a g e ? :   s t r i n g   |   n u l l  
                     h e r o _ i m a g e :   s t r i n g  
                     h e r o _ i m a g e _ s c a l e :   n u m b e r  
                     h e r o _ i m a g e _ p o s i t i o n _ l e f t :   n u m b e r  
                     h e r o _ i m a g e _ p o s i t i o n _ t o p :   n u m b e r  
                     m o v e _ a t t r i b u t e :   n u m b e r  
                     a t t a c k _ a t t r i b u t e :   n u m b e r  
                     d e f e n d _ a t t r i b u t e :   n u m b e r  
                     s k i l l _ a t t r i b u t e :   n u m b e r  
                     f o c u s _ a t t r i b u t e :   n u m b e r  
                     l i f e _ a t t r i b u t e :   n u m b e r  
                     a w a k e n i n g _ a t t r i b u t e :   n u m b e r  
                     a c t i o n _ d i c e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " d i c e _ i c o n s " ] [ ]  
                     i s _ s u p p o r t _ f i g u r e ? :   b o o l e a n  
                     n a m e _ f o n t _ s i z e ? :   n u m b e r   |   n u l l  
                     k e y w o r d s _ f o n t _ s i z e ? :   n u m b e r   |   n u l l  
                     a b i l i t y _ n a m e _ f o n t _ s i z e ? :   n u m b e r   |   n u l l  
                     a b i l i t y _ e f f e c t _ f o n t _ s i z e ? :   n u m b e r   |   n u l l  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     t h e m e ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     t o k e n _ i d ? :   n u m b e r   |   n u l l  
                     s h e e t _ b a c k g r o u n d _ c o l o r ? :   s t r i n g  
                     d i c e _ i c o n _ c o l o r ? :   s t r i n g  
                     d i c e _ b a c k g r o u n d _ c o l o r ? :   s t r i n g  
                     t r a i t _ k e y w o r d s ? :   s t r i n g  
                     a b i l i t y _ n a m e s ? :   s t r i n g [ ]  
                     a b i l i t y _ e f f e c t s ? :   s t r i n g [ ]  
                     i c o n _ i m a g e ? :   s t r i n g   |   n u l l  
                     h e r o _ i m a g e ? :   s t r i n g  
                     h e r o _ i m a g e _ s c a l e ? :   n u m b e r  
                     h e r o _ i m a g e _ p o s i t i o n _ l e f t ? :   n u m b e r  
                     h e r o _ i m a g e _ p o s i t i o n _ t o p ? :   n u m b e r  
                     m o v e _ a t t r i b u t e ? :   n u m b e r  
                     a t t a c k _ a t t r i b u t e ? :   n u m b e r  
                     d e f e n d _ a t t r i b u t e ? :   n u m b e r  
                     s k i l l _ a t t r i b u t e ? :   n u m b e r  
                     f o c u s _ a t t r i b u t e ? :   n u m b e r  
                     l i f e _ a t t r i b u t e ? :   n u m b e r  
                     a w a k e n i n g _ a t t r i b u t e ? :   n u m b e r  
                     a c t i o n _ d i c e ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " d i c e _ i c o n s " ] [ ]  
                     i s _ s u p p o r t _ f i g u r e ? :   b o o l e a n  
                     n a m e _ f o n t _ s i z e ? :   n u m b e r   |   n u l l  
                     k e y w o r d s _ f o n t _ s i z e ? :   n u m b e r   |   n u l l  
                     a b i l i t y _ n a m e _ f o n t _ s i z e ? :   n u m b e r   |   n u l l  
                     a b i l i t y _ e f f e c t _ f o n t _ s i z e ? :   n u m b e r   |   n u l l  
                 }  
             }  
             h o m e b r e w _ r a t i n g s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     h o m e b r e w _ i d :   n u m b e r  
                     u s e r _ i d :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d ? :   n u m b e r  
                     h o m e b r e w _ i d :   n u m b e r  
                     u s e r _ i d :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     h o m e b r e w _ i d ? :   n u m b e r  
                     u s e r _ i d ? :   s t r i n g  
                 }  
             }  
             h o m e b r e w _ s a v e s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     h o m e b r e w _ i d :   n u m b e r  
                     u s e r _ i d :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d ? :   n u m b e r  
                     h o m e b r e w _ i d :   n u m b e r  
                     u s e r _ i d :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     h o m e b r e w _ i d ? :   n u m b e r  
                     u s e r _ i d ? :   s t r i n g  
                 }  
             }  
             h o m e b r e w s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     u s e r _ i d :   s t r i n g  
                     n a m e :   s t r i n g  
                     d e s c r i p t i o n :   s t r i n g   |   n u l l  
                     o r i g i n a l _ i m a g e :   s t r i n g   |   n u l l  
                     a u g s _ l i c e n s e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " a u g s _ l i c e n s e s " ]  
                     h o m e b r e w _ c a t e g o r y :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " h o m e b r e w _ c a t e g o r i e s " ]  
                     d a t e _ c r e a t e d :   s t r i n g  
                     d a t e _ m o d i f i e d :   s t r i n g  
                     i s _ d e l e t e d :   b o o l e a n  
                 }  
                 I n s e r t :   {  
                     i d ? :   n u m b e r  
                     u s e r _ i d :   s t r i n g  
                     n a m e :   s t r i n g  
                     d e s c r i p t i o n ? :   s t r i n g   |   n u l l  
                     o r i g i n a l _ i m a g e ? :   s t r i n g   |   n u l l  
                     a u g s _ l i c e n s e ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " a u g s _ l i c e n s e s " ]  
                     h o m e b r e w _ c a t e g o r y :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " h o m e b r e w _ c a t e g o r i e s " ]  
                     d a t e _ c r e a t e d ? :   s t r i n g  
                     d a t e _ m o d i f i e d ? :   s t r i n g  
                     i s _ d e l e t e d ? :   b o o l e a n  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     u s e r _ i d ? :   s t r i n g  
                     n a m e ? :   s t r i n g  
                     d e s c r i p t i o n ? :   s t r i n g   |   n u l l  
                     o r i g i n a l _ i m a g e ? :   s t r i n g   |   n u l l  
                     a u g s _ l i c e n s e ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " a u g s _ l i c e n s e s " ]  
                     h o m e b r e w _ c a t e g o r y ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " h o m e b r e w _ c a t e g o r i e s " ]  
                     d a t e _ c r e a t e d ? :   s t r i n g  
                     d a t e _ m o d i f i e d ? :   s t r i n g  
                     i s _ d e l e t e d ? :   b o o l e a n  
                 }  
             }  
             m a p _ t i l e s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     i m a g e :   s t r i n g  
                     n u m b e r :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d :   n u m b e r  
                     i m a g e :   s t r i n g  
                     n u m b e r :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     i m a g e ? :   s t r i n g  
                     n u m b e r ? :   s t r i n g  
                 }  
             }  
             p o s t s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     h o m e b r e w _ i d :   n u m b e r  
                     u s e r _ i d :   s t r i n g  
                     p a r e n t _ i d :   n u m b e r   |   n u l l  
                     c o n t e n t :   s t r i n g   |   n u l l  
                     d a t e _ c r e a t e d :   s t r i n g  
                     d a t e _ m o d i f i e d :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d ? :   n u m b e r  
                     h o m e b r e w _ i d :   n u m b e r  
                     u s e r _ i d :   s t r i n g  
                     p a r e n t _ i d ? :   n u m b e r   |   n u l l  
                     c o n t e n t ? :   s t r i n g   |   n u l l  
                     d a t e _ c r e a t e d ? :   s t r i n g  
                     d a t e _ m o d i f i e d ? :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     h o m e b r e w _ i d ? :   n u m b e r  
                     u s e r _ i d ? :   s t r i n g  
                     p a r e n t _ i d ? :   n u m b e r   |   n u l l  
                     c o n t e n t ? :   s t r i n g   |   n u l l  
                     d a t e _ c r e a t e d ? :   s t r i n g  
                     d a t e _ m o d i f i e d ? :   s t r i n g  
                 }  
             }  
             r o l e s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     n a m e :   s t r i n g  
                     c o l o r :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d ? :   n u m b e r  
                     n a m e :   s t r i n g  
                     c o l o r :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     n a m e ? :   s t r i n g  
                     c o l o r ? :   s t r i n g  
                 }  
             }  
             s k i l l _ c a r d s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     h e r o _ i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e :   s t r i n g  
                     a b i l i t y _ n a m e :   s t r i n g  
                     a b i l i t y _ e f f e c t :   s t r i n g  
                     a b i l i t y _ c o s t :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " s k i l l _ c a r d _ i c o n s " ] [ ]  
                 }  
                 I n s e r t :   {  
                     i d :   n u m b e r  
                     h e r o _ i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e :   s t r i n g  
                     a b i l i t y _ n a m e :   s t r i n g  
                     a b i l i t y _ e f f e c t :   s t r i n g  
                     a b i l i t y _ c o s t :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " s k i l l _ c a r d _ i c o n s " ] [ ]  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     h e r o _ i d ? :   n u m b e r  
                     t h e m e ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e ? :   s t r i n g  
                     a b i l i t y _ n a m e ? :   s t r i n g  
                     a b i l i t y _ e f f e c t ? :   s t r i n g  
                     a b i l i t y _ c o s t ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " s k i l l _ c a r d _ i c o n s " ] [ ]  
                 }  
             }  
             t o k e n s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     i m a g e :   s t r i n g  
                     c a t e g o r y :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t o k e n _ c a t e g o r i e s " ]  
                     g r i d _ s i z e _ x :   n u m b e r  
                     g r i d _ s i z e _ y :   n u m b e r  
                 }  
                 I n s e r t :   {  
                     i d :   n u m b e r  
                     i m a g e :   s t r i n g  
                     c a t e g o r y :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t o k e n _ c a t e g o r i e s " ]  
                     g r i d _ s i z e _ x ? :   n u m b e r  
                     g r i d _ s i z e _ y ? :   n u m b e r  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     i m a g e ? :   s t r i n g  
                     c a t e g o r y ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t o k e n _ c a t e g o r i e s " ]  
                     g r i d _ s i z e _ x ? :   n u m b e r  
                     g r i d _ s i z e _ y ? :   n u m b e r  
                 }  
             }  
             u s e r _ p r o f i l e s :   {  
                 R o w :   {  
                     i d :   s t r i n g  
                     r o l e _ i d :   n u m b e r  
                     u s e r _ n a m e :   s t r i n g   |   n u l l  
                     a v a t a r :   s t r i n g   |   n u l l  
                     d i s c o r d :   s t r i n g   |   n u l l  
                     b o a r d g a m e g e e k :   s t r i n g   |   n u l l  
                     d a t e _ c r e a t e d :   s t r i n g  
                     d a t e _ m o d i f i e d :   s t r i n g  
                     i s _ d e l e t e d :   b o o l e a n  
                 }  
                 I n s e r t :   {  
                     i d :   s t r i n g  
                     r o l e _ i d ? :   n u m b e r  
                     u s e r _ n a m e ? :   s t r i n g   |   n u l l  
                     a v a t a r ? :   s t r i n g   |   n u l l  
                     d i s c o r d ? :   s t r i n g   |   n u l l  
                     b o a r d g a m e g e e k ? :   s t r i n g   |   n u l l  
                     d a t e _ c r e a t e d ? :   s t r i n g  
                     d a t e _ m o d i f i e d ? :   s t r i n g  
                     i s _ d e l e t e d ? :   b o o l e a n  
                 }  
                 U p d a t e :   {  
                     i d ? :   s t r i n g  
                     r o l e _ i d ? :   n u m b e r  
                     u s e r _ n a m e ? :   s t r i n g   |   n u l l  
                     a v a t a r ? :   s t r i n g   |   n u l l  
                     d i s c o r d ? :   s t r i n g   |   n u l l  
                     b o a r d g a m e g e e k ? :   s t r i n g   |   n u l l  
                     d a t e _ c r e a t e d ? :   s t r i n g  
                     d a t e _ m o d i f i e d ? :   s t r i n g  
                     i s _ d e l e t e d ? :   b o o l e a n  
                 }  
             }  
             v i l l a i n _ c a r d _ f i g u r e _ a c t i o n s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     v i l l a i n _ c a r d _ i d :   n u m b e r  
                     f i g u r e _ n a m e :   s t r i n g  
                     a c t i o n s :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " d i c e _ i c o n s " ] [ ]  
                 }  
                 I n s e r t :   {  
                     i d :   n u m b e r  
                     v i l l a i n _ c a r d _ i d :   n u m b e r  
                     f i g u r e _ n a m e :   s t r i n g  
                     a c t i o n s :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " d i c e _ i c o n s " ] [ ]  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     v i l l a i n _ c a r d _ i d ? :   n u m b e r  
                     f i g u r e _ n a m e ? :   s t r i n g  
                     a c t i o n s ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " d i c e _ i c o n s " ] [ ]  
                 }  
             }  
             v i l l a i n _ c a r d s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     v i l l a i n _ i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e :   s t r i n g  
                     a b i l i t y _ n a m e :   s t r i n g  
                     a b i l i t y _ e f f e c t :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d :   n u m b e r  
                     v i l l a i n _ i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e :   s t r i n g  
                     a b i l i t y _ n a m e :   s t r i n g  
                     a b i l i t y _ e f f e c t :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     v i l l a i n _ i d ? :   n u m b e r  
                     t h e m e ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     i m a g e ? :   s t r i n g  
                     a b i l i t y _ n a m e ? :   s t r i n g  
                     a b i l i t y _ e f f e c t ? :   s t r i n g  
                 }  
             }  
             v i l l a i n _ t a r g e t _ p r i o r i t i e s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     n a m e :   s t r i n g  
                     d e s c r i p t i o n :   s t r i n g   |   n u l l  
                     i m a g e :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d ? :   n u m b e r  
                     n a m e :   s t r i n g  
                     d e s c r i p t i o n ? :   s t r i n g   |   n u l l  
                     i m a g e :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     n a m e ? :   s t r i n g  
                     d e s c r i p t i o n ? :   s t r i n g   |   n u l l  
                     i m a g e ? :   s t r i n g  
                 }  
             }  
             v i l l a i n s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     t o k e n _ i d :   n u m b e r  
                     b a c k g r o u n d _ c o l o r :   s t r i n g  
                     i c o n _ i m a g e :   s t r i n g  
                     v i l l a i n _ i m a g e :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d :   n u m b e r  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     t o k e n _ i d :   n u m b e r  
                     b a c k g r o u n d _ c o l o r :   s t r i n g  
                     i c o n _ i m a g e :   s t r i n g  
                     v i l l a i n _ i m a g e :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     t h e m e ? :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]  
                     t o k e n _ i d ? :   n u m b e r  
                     b a c k g r o u n d _ c o l o r ? :   s t r i n g  
                     i c o n _ i m a g e ? :   s t r i n g  
                     v i l l a i n _ i m a g e ? :   s t r i n g  
                 }  
             }  
         }  
         V i e w s :   {  
             h e r o e s _ t a b l e :   {  
                 R o w :   {  
                     i d :   n u m b e r   |   n u l l  
                     u s e r _ i d :   s t r i n g   |   n u l l  
                     u s e r _ n a m e :   s t r i n g   |   n u l l  
                     n a m e :   s t r i n g   |   n u l l  
                     d e s c r i p t i o n :   s t r i n g   |   n u l l  
                     h e r o _ i m a g e :   s t r i n g   |   n u l l  
                     h e r o _ i m a g e _ p o s i t i o n _ l e f t :   n u m b e r   |   n u l l  
                     h e r o _ i m a g e _ p o s i t i o n _ t o p :   n u m b e r   |   n u l l  
                     h e r o _ i m a g e _ s c a l e :   n u m b e r   |   n u l l  
                     i c o n _ i m a g e :   s t r i n g   |   n u l l  
                     t h e m e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " t h e m e s " ]   |   n u l l  
                     t o k e n _ i d :   n u m b e r   |   n u l l  
                     t o k e n _ i m a g e :   s t r i n g   |   n u l l  
                     t r a i t _ k e y w o r d s :   s t r i n g   |   n u l l  
                     a b i l i t y _ e f f e c t s :   s t r i n g [ ]   |   n u l l  
                     a b i l i t y _ n a m e s :   s t r i n g [ ]   |   n u l l  
                     a c t i o n _ d i c e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " d i c e _ i c o n s " ] [ ]   |   n u l l  
                     s h e e t _ b a c k g r o u n d _ c o l o r :   s t r i n g   |   n u l l  
                     d i c e _ b a c k g r o u n d _ c o l o r :   s t r i n g   |   n u l l  
                     d i c e _ i c o n _ c o l o r :   s t r i n g   |   n u l l  
                     a t t a c k _ a t t r i b u t e :   n u m b e r   |   n u l l  
                     d e f e n d _ a t t r i b u t e :   n u m b e r   |   n u l l  
                     f o c u s _ a t t r i b u t e :   n u m b e r   |   n u l l  
                     m o v e _ a t t r i b u t e :   n u m b e r   |   n u l l  
                     s k i l l _ a t t r i b u t e :   n u m b e r   |   n u l l  
                     l i f e _ a t t r i b u t e :   n u m b e r   |   n u l l  
                     a w a k e n i n g _ a t t r i b u t e :   n u m b e r   |   n u l l  
                     i s _ s u p p o r t _ f i g u r e :   b o o l e a n   |   n u l l  
                     h o m e b r e w _ c a t e g o r y :  
                         |   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " h o m e b r e w _ c a t e g o r i e s " ]  
                         |   n u l l  
                     a u g s _ l i c e n s e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " a u g s _ l i c e n s e s " ]   |   n u l l  
                     d a t e _ c r e a t e d :   s t r i n g   |   n u l l  
                     d a t e _ m o d i f i e d :   s t r i n g   |   n u l l  
                     o r i g i n a l _ i m a g e :   s t r i n g   |   n u l l  
                     i s _ d e l e t e d :   b o o l e a n   |   n u l l  
                     n a m e _ f o n t _ s i z e :   n u m b e r   |   n u l l  
                     k e y w o r d s _ f o n t _ s i z e :   n u m b e r   |   n u l l  
                     a b i l i t y _ n a m e _ f o n t _ s i z e :   n u m b e r   |   n u l l  
                     a b i l i t y _ e f f e c t _ f o n t _ s i z e :   n u m b e r   |   n u l l  
                 }  
             }  
             t o k e n s _ t a b l e :   {  
                 R o w :   {  
                     i d :   n u m b e r   |   n u l l  
                     u s e r _ i d :   s t r i n g   |   n u l l  
                     u s e r _ n a m e :   s t r i n g   |   n u l l  
                     n a m e :   s t r i n g   |   n u l l  
                     d e s c r i p t i o n :   s t r i n g   |   n u l l  
                     i m a g e :   s t r i n g   |   n u l l  
                     h o m e b r e w _ c a t e g o r y :  
                         |   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " h o m e b r e w _ c a t e g o r i e s " ]  
                         |   n u l l  
                     a u g s _ l i c e n s e :   D a t a b a s e [ " p u b l i c " ] [ " E n u m s " ] [ " a u g s _ l i c e n s e s " ]   |   n u l l  
                     d a t e _ c r e a t e d :   s t r i n g   |   n u l l  
                     d a t e _ m o d i f i e d :   s t r i n g   |   n u l l  
                     o r i g i n a l _ i m a g e :   s t r i n g   |   n u l l  
                     i s _ d e l e t e d :   b o o l e a n   |   n u l l  
                 }  
             }  
         }  
         F u n c t i o n s :   {  
             [ _   i n   n e v e r ] :   n e v e r  
         }  
         E n u m s :   {  
             a u g s _ l i c e n s e s :   " T M N T "   |   " B T A S "   |   " H o m e b r e w "  
             d i c e _ i c o n s :  
                 |   " M e l e e "  
                 |   " R a n g e "  
                 |   " M o v e "  
                 |   " D e f e n d "  
                 |   " F o c u s "  
                 |   " D o u b l e M e l e e "  
                 |   " D o u b l e R a n g e "  
                 |   " D o u b l e M o v e "  
                 |   " D e f e n d M e l e e "  
                 |   " D e f e n d R a n g e "  
                 |   " D e f e n d M o v e "  
             h o m e b r e w _ c a t e g o r i e s :  
                 |   " H e r o e s "  
                 |   " V i l l a i n s "  
                 |   " M a p T i l e s "  
                 |   " T o k e n s "  
                 |   " S c e n a r i o s "  
                 |   " E v e n t D e c k s "  
                 |   " S k i l l C a r d s "  
                 |   " V i l l a i n D e c k s "  
                 |   " G a d g e t s "  
                 |   " A l l i e s "  
             s k i l l _ c a r d _ i c o n s :  
                 |   " M e l e e "  
                 |   " R a n g e "  
                 |   " M o v e "  
                 |   " D e f e n d "  
                 |   " F o c u s "  
                 |   " D o u b l e M e l e e "  
                 |   " D o u b l e R a n g e "  
                 |   " D o u b l e M o v e "  
                 |   " D e f e n d M e l e e "  
                 |   " D e f e n d R a n g e "  
                 |   " D e f e n d M o v e "  
                 |   " P e r s i s t e n t "  
                 |   " O n e T i m e U s e "  
                 |   " W i l d "  
             t h e m e s :   " T M N T "   |   " B T A S "  
             t o k e n _ c a t e g o r i e s :  
                 |   " B l o c k i n g T e r r a i n "  
                 |   " C o v e r e d T e r r a i n "  
                 |   " E l e v a t e d T e r r a i n "  
                 |   " H a r m f u l T e r r a i n "  
                 |   " O b s c u r i n g T e r r a i n "  
                 |   " R o u g h T e r r a i n "  
                 |   " S l o w T e r r a i n "  
                 |   " U n s t a b l e T e r r a i n "  
                 |   " N e u t r a l T e r r a i n "  
                 |   " M i x e d T e r r a i n "  
                 |   " F o c u s "  
                 |   " D i c e "  
                 |   " D o o r s "  
                 |   " F i g u r e s "  
                 |   " G o a l s "  
                 |   " W o u n d s "  
                 |   " O b j e c t i v e s "  
                 |   " O b j e c t s "  
                 |   " S p a w n s "  
                 |   " S t a t u s e s "  
         }  
     }  
 }  
 