const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to Neon Database ONLY
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, catalogName })
      });

      // 2. Show Success State on the website
      setIsSuccess(true);

      // 3. Trigger the Download immediately
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${catalogName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 4. Close modal after 3 seconds
      setTimeout(() => {
        setShowForm(false);
        setIsSuccess(false);
        setPhone('');
      }, 3000);

    } catch (err) {
      console.error("Lead capture failed:", err);
      // We still trigger download even if DB fails so user isn't blocked
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${catalogName}.pdf`;
      link.click();
    } finally {
      setIsSubmitting(false);
    }
  };