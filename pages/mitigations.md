# Mitigations

The strongest mitigation against ClickFix lures is disabling the **Win+R** Run dialog box and 
limiting applications from being ran from the File Explorer address bar.

This can be done with this registry tweak:

```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoRun /t REG_DWORD /d 1 /f
```

Note that you will need to restart Explorer for this to take effect. This can be most easily done by logging
out and logging back in.